import * as React from 'react';
import { json, User, SetAccessToken } from '../../utils/api';
import { RouteComponentProps, Link } from 'react-router-dom';

export default class Login extends React.Component<ILoginProps, ILoginState> {

    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginError: false
        };
    }

    private alert: JSX.Element = null; 
    private loggingIn: boolean = false;

    // if user is already logged in send them to home
    componentDidMount() {
        if (User.userid != null) this.props.history.push('/');
    }

    handleLoginSubmit = async() => {
        if (this.loggingIn) return; // user already clicked login. processing

        if (this.state.email && this.state.password) {
            try {
                this.loggingIn = true;
                let result = await json('/auth/login', 'POST', {
                    email: this.state.email,
                    password: this.state.password
                });

                if (result) { // don't know username atm
                    SetAccessToken(result.token, { userid: result.userid, role: result.role });

                    // grab username
                    let unResult = await json('/api/authors/name/' + result.userid);

                    localStorage.setItem('username', unResult[0]['name']);
                    User.username = unResult[0]['name'];
                    localStorage.setItem('email', this.state.email);
                    window.location.reload(); // logged in, now refresh to get redirected and update nav bar
                } else {
                    // check login status
                    this.setState({loginError: true});
                }
            } catch(e) {
                throw e;
            } finally {
                this.loggingIn = false;
            }
        } else {
            // user didn't enter email and/or pass
            this.setState({loginError: true});
        }
    }

    render () {
        if (this.state.loginError === true) {
            this.alert = <div className='alert alert-danger p-2 my-4' role='alert'>Invalid Login Info</div>
        }

        return (
            <div className="card m-4 p-3 shadow">
                <div className="card-body">
                    <h5 className="m-3">Email
                    <input type="text" className="form-control" placeholder='email...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })}></input>
                    </h5>

                    <h5 className="m-3">Password
                    <input type="password" className="form-control" placeholder='password...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })}></input>
                    </h5>

                    <Link to={'/register'} className="nav-link text-center"> Create New Account </Link>   

                    <button className="btn btn-secondary mt-3 col-md-12 text-center" type="submit"
                        onClick={this.handleLoginSubmit}>Login
                    </button>
                    {this.alert}
                </div>
            </div>
        );
    }
}

export interface ILoginProps extends RouteComponentProps { }

export interface ILoginState {
    email: string, 
    password: string,
    loginError: boolean
}


