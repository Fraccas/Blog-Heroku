import * as React from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';

class Form extends React.Component<IFormProps, IFormState> {

    constructor(props: IFormProps) {
        super(props);
        this.state = {
            name: "",
            amount: ""
        }
    }

    handleSubmit = async(e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let { token } = await this.props.stripe.createToken({ name: this.state.name });

            let amount = this.state.amount;
            await fetch('/api/donate', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                }, 
                body: JSON.stringify( { token, amount } )
            });

            alert('Thank you for your donation of ' + this.state.amount + ', ' + this.state.name + '!');
            location.reload();

        } catch (e) {
            throw e;
        }
    }

    render() {
        return (
            <main className="container">
                <form 
                    className="form-group mt-3 p-3 border border-primary rounder shadow-lg"
                    onSubmit={this.handleSubmit}
                >
                    <label>Name</label>
                    <input
                        type="text" className="input-group my-1 p-1 border border-dark"
                        value={this.state.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({name: e.target.value})}
                    />

                    <label>Amount</label>
                    <input
                        type="text" className="input-group my-1 p-1 border border-dark"
                        value={this.state.amount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({amount: e.target.value})}
                    />

                    <label>CC Number -- Exp Date -- CVC</label>
                    <CardElement className="p-2 border border-dark" />
                    <button className="btn btn-primary border border-dark shadow mt-3">Donate</button>
                </form>
            </main>
        );
    }
}

interface IFormProps extends ReactStripeElements.InjectedStripeProps { }

interface IFormState {
    name: string,
    amount: string
 }

export default injectStripe(Form);