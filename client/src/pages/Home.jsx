function Home() {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-slate-700">
        Welcome To MERN Auth
      </h1>
      <p className="mb-4 text-slate-900">
        {" "}
        This MERN Authentication App is a robust, reusable codebase equipped
        with essential authentication features, enabling seamless user
        authentication processes within MERN stack applications.
      </p>
      <p className="mb-4 text-slate-900">
        It includes signup/login forms, OAuth, update user
        <br />
        information and password reset functionality. The project utilizes React
        for the front-end UI, Express.js as the server framework , firebase as
        data storage , and mongoDB for user data <br />
      </p>
      <p className="mb-4 text-slate-900">
        <span className="text-green-700 font-semibold">Future plans</span> :
        Verification via email, Confirmation mail for Deleting account and
        Password reset through registered email.
      </p>
    </div>
  );
}

export default Home;
