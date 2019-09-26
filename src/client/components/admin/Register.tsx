import * as React from 'react';
import { json, User, SetAccessToken } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';

export default class Register extends React.Component<IRegisterProps, IRegisterState> {

    constructor(props: IRegisterProps) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            registerError: false
        };
    }

    private alert: JSX.Element = null; 
    private loggingIn: boolean = false;

    // if user is already logged in send them to home
    componentDidMount() {
        if (User.userid != null) this.props.history.push('/');
    }

    handleRegisterSubmit = async() => {
        if (this.loggingIn) return; // user already clicked create. processing

        if (this.state.email && this.state.password && this.state.username) {
            try {
                this.loggingIn = true;
                let result = await json('/auth/register', 'POST', {
                    name: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                });

                if (result) { // don't know username atm
                    SetAccessToken(result.token, { userid: result.userid, role: result.role });

                    localStorage.setItem('username', this.state.username);
                    User.username = this.state.username;

                    localStorage.setItem('email', this.state.email);
                    window.location.reload(); // logged in, now refresh to get redirected and update nav bar
                } else {
                    // check login status
                    this.setState({registerError: true});
                }
            } catch(e) {
                throw e;
            } finally {
                this.loggingIn = false;
            }
        } else {
            // user didn't enter email and/or pass
            this.setState({registerError: true});
        }
    }

    render () {
        if (this.state.registerError === true) {
            this.alert = <div className='alert alert-danger p-2 my-4' role='alert'>Please enter all information!</div>
        }

        return (
            <div className="card m-4 p-3 shadow">
                <div className="card-body">
                    <h5 className="m-3">Name
                    <input type="text" className="form-control" placeholder='name...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ username: e.target.value })}></input>
                    </h5>

                    <h5 className="m-3">Email
                    <input type="text" className="form-control" placeholder='email...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })}></input>
                    </h5>

                    <h5 className="m-3">Password
                    <input type="password" className="form-control" placeholder='password...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })}></input>
                    </h5>

                    <button className="btn btn-secondary mt-3 col-md-12 text-center" type="submit"
                        onClick={this.handleRegisterSubmit}>Create Account
                    </button>
                    {this.alert}
                </div>
            </div>
        );
    }
}

export interface IRegisterProps extends RouteComponentProps { }

export interface IRegisterState {
    username: string
    email: string, 
    password: string,
    registerError: boolean
}


