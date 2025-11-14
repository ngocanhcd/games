const express = require("express");
const app = express();
const port = 3000;

const { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } = require("vnpay");

app.post("/api/create-qr", async (req, res) => {
  const vnpay = new VNPay({
    tmnCode: "S4T8DR4J",
    secureSecret: "20RZNKXE0QFOYJQUVTK06YF9X4M3YS3V",
    vnpayHost: "https://sandbox.vnpayment.vn",
    testMode: true,
    hashAlgorithm: "SHA512",
    loggerFn: ignoreLogger,
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const vnpayResponse = await vnpay.buildPaymentUrl({
    vnp_Amount: 50000,
    vnp_IpAddr: "127.0.0.1",
    vnp_TxnRef: "123456",
    vnp_OrderInfo: "123456",
    vnp_OrderType: ProductCode.Other,
    vnp_ReturnUrl: `http://localhost:3000/api/vnpay-return`,
    vnp_Locale: VnpLocale.VN,
    vnp_CreateDate: dateFormat(new Date()),
    vnp_ExpireDate: dateFormat(tomorrow),
  });

  return res.status(201).json(vnpayResponse);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
