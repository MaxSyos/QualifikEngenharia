import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    await sendgrid.send({
      to: "qualifik.estagio@gmail.com", // Your email where you'll receive emails
      from: "qualifik.estagio@gmail.com", // your website email address here
      subject: `${req.body.subject} - Enviado por ${req.body.name}`,
      html: `<div>Recebido do Contato - ${req.body.email}</div>
            </br> Enviado por - ${req.body.name}
            </br><div>${req.body.message}</div>`,
    });
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;
