
const Form = () => {
    return (
        <div className="login_form_container">
            <div className="login_form" >
                <h2>Login</h2>
                <div className="input_group">
                    <i className="fa fa-user"></i>
                    <input
                        type="text"
                        placeholder="Username"
                        className="input_text"
                        autoComplete="off"
                    />
                </div>
                <div className="input_group">
                    <i className="fa fa-unlock-alt"></i>
                    <input
                        type="password"
                        placeholder="Password"
                        className="input_text"
                        autoComplete="off"
                    />
                </div>
                <div className="button_group" id="login_button">
                    <a>Submit</a>
                </div>
                <div className="fotter">
                    <a href="">Forgot password?</a>
                    <a href="">Signup</a>
                </div>
            </div>
        </div>
    )
}

export default Form
