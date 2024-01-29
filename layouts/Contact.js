import config from "@config/config.json";
import Banner from "./components/Banner";
import ImageFallback from "./components/ImageFallback";
import { useState } from "react";
import { useRouter } from 'next/router';


const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  //   Form validation state
  const [errors, setErrors] = useState({});

  //   Setting button text on form submission
  const [buttonText, setButtonText] = useState("Send");

  // Setting success or failure messages states
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  // Validation check method
  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (name.length <= 0) {
      tempErrors["name"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (subject.length <= 0) {
      tempErrors["subject"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

     
    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        email: email,
        name: name,
        subject: subject,
        message: message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      console.log(error);
      return;
    }
    console.log("vem daqui",name, email, subject, message);
    router.push('/');
  };

  return (
    <section className="section">
     
      <div className="container">
        <div className="section row items-center justify-center">
          <div className="animate lg:col-5">
            <ImageFallback
              className="mx-auto lg:pr-10"
              src="/images/contato-removed.png"
              width={600}
              height={500}
              alt=""
            />
          </div>
          <div className="animate lg:col-5">
            <form
              method="POST"
              action={config.params.contact_form_action}
              className="contact-form rounded-xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.05)]"
              onSubmit={handleSubmit}
            >
              <h2 className="h4 mb-6">Envie sua Mensagem</h2>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="name"
                >
                  Nome
                </label>
                <input
                  className="form-input w-full"
                  name="name"
                  placeholder="Nome"
                  type="text"
                  value={name}
                  onChange={(e) => {setName(e.target.value)}}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="form-input w-full"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="subject"
                >
                  Assunto
                </label>
                <input
                  className="form-input w-full"
                  name="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => {setSubject(e.target.value)}}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="message"
                >
                  Mensagem
                </label>
                <textarea className="form-textarea w-full" rows="6" 
                value={message}
                onChange={(e) => {setMessage(e.target.value)}}
                />
              </div>
              <button type={"submit"} className="btn btn-primary block w-full">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
