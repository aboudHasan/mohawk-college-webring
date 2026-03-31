import nodemailer from "nodemailer";
import members from "../members.json" with { type: "json" };
const email_user = process.env.EMAIL;
const email_pass = process.env.APP_PASSWORD;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aboudhasan06@gmail.com",
    pass: process.env.APP_PASSWORD,
  },
});

// assuming the last object in the members array is the newest member
for (let i = 0; i < members.length - 1; i++) {
  try {
    if (!members[i].email) {
      throw new Error(`${members[i].name} hasn't provided an email.`);
    }

    const info = await transporter.sendMail({
      from: email_user,
      to: members[i].email,
      subject: `A new member has joined the Mohawk College Webring!`,
      text: `${members[members.length - 1].name} has joined the Mohawk College Webring, and since you provided your email, you have been notified. \n\nWhen you have a chance, please provide the new member with feedback on their portfolio/site: ${members[members.length - 1].url}\n\nIf you would like to stop receiving these emails, please submit another pull request to remove the email property from your member object.`,
    });
  } catch (err) {
    console.log(`Error when sending email: ${err}`);
  }
}
