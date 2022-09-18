"use strict";

/**
 *  payment controller
 */

const Xendit = require("xendit-node");
const { createAuthorization } = require("xendit-node/src/card/authorization");
const x = new Xendit({
  secretKey:
    "xnd_development_URrf17t6hhUNJTzSR7cxGpQSnhKirmLQndQehhKsqNeycsy1ZJoFFQDjLaxAO",
  xenditURL: "https://api.xendit.co",
});
const { VirtualAcc, Invoice } = x;

const va = new VirtualAcc({});
const i = new Invoice({})

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::payment.payment", ({ strapi }) => ({
  async xenditVa() {
    const banks = await va.getVABanks();

    const entities = banks.filter((bank) => bank.is_activated === true);

    return entities;
  },
  
  async createInvoice(ctx) {
    const { body: { amount }} = ctx.request;

    const invoice = await i.createInvoice({
      externalID: 'your-external-id',
      payerEmail: 'putra@gmail.com',
      description: 'Pembayaran UD. Putra',
      amount: amount,
    });
    
    return invoice;
  },

  async xenditCreateVa(ctx) {
    let { body } = ctx.request;
    const {
      body: { productId },
    } = ctx.request;
    const {
      body: { user },
    } = ctx.request;
    const {
      body: { qty },
    } = ctx.request;

    body = {
      ...body,
      expirationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    };

    const fixedVA = await va.createFixedVA(body);

    ctx.request.body = {
      data: {
        transaction: null,
        is_paid: false,
        xendit_va_object: fixedVA,
      },
    };

    const payment = await super.create(ctx);

    ctx.request.body = {
      data: {
        status: "waiting_payment",
        payment: payment.data.id,
        profile: user,
      },
    };

    const transaction = await strapi
      .controller("api::transaction.transaction")
      .create(ctx);
    
    console.log({ productId })
    console.log({ qty })
    
    for (let i = 0; i < productId.length; i++) {      
      ctx.request.body = {
        data: {
          product: productId[i],
          transaction: transaction.data.id,
          qty: String(qty[i]),
        },
      };

      const transaction_detail = await strapi
        .controller("api::transaction-detail.transaction-detail")
        .create(ctx);
    }
    
    ctx.query = {
      ...ctx.query,
      filters: {
        profile: {
          id: {
            $eq: user
          }
        }
      }
    }
    
    const carts = await strapi.controller("api::cart.cart").find(ctx)
    
    console.log(carts.data)
    
    for (let i = 0; i < carts.data.length; i++) { 
      ctx.params = { id: carts.data[i].id }
      
      const cartsDelete = await strapi.controller("api::cart.cart").delete(ctx)
    }

    return payment;
  },

  async xenditCallback(ctx) {
    return ctx.send(
      {
        message: "Body received",
      },
      200
    );
  },
}));
