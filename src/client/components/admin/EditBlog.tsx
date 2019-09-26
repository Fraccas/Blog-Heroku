import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json } from '../../utils/api';

class Admin extends Component<IAdminProps, IAdminState> {

    constructor(props: IAdminProps) {
        super(props);
        this.state = {
            blog: {id: '', title: '', content: '', authorid: '', _created: ''},
            id: this.props.match.params.id,
            nTitle: '',
            nContent: ''
        }
    }

    private saving: boolean = false;

    async componentDidMount() {
        try {
            let url = '/api/blogs/' + this.state.id;
            let r = await fetch(url);
            let blogData = await r.json();
            console.log(blogData);
        
            this.setState({
                blog: blogData[0], // returns array, but only one object needed
            });
        } catch (error) {
            console.log(error);
        }
    }

    // render the admin panel
    render() {
        if (this.state.blog) {
            return (
                <div className="input-container bg-light m-5 rounded p-4 border shadow">
                <h2 className="text-center p-2 rounded bg-secondary text-light">Edit Chirp</h2>
                <div className="form-group">
                    <label htmlFor="name">Title</label>
                    <input type="text" className="form-control" defaultValue={this.state.blog.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({nTitle: e.target.value})}></input>

                    <label htmlFor="blog">Blog</label>
                    <input type="text" className="form-control" defaultValue={this.state.blog.content}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({nContent: e.target.value})}></input>

                    <button className="btn btn-warning ml-0 mt-3" type="submit"
                    onClick={this.UpdateBlog}>Update Blog</button>

                    <button className="btn btn-danger ml-2 mt-3" type="submit"
                    onClick={this.DeleteBlog}>Delete Blog</button>

                    <button className="btn btn-secondary ml-2 mt-3" type="submit"
                    onClick={() => {this.props.history.push('/')}}>  Cancel  </button>
                </div>
            </div>
            );
        } else {
            return (<h1>No chirps returned. Invalid ID.</h1>)
        }
    }

    UpdateBlog = async () => {       
        if (this.saving) return; // prevent spam click

        // make sure new text is not empty (make sure an update occured from input)
        if (this.state.nTitle) this.state.blog.title = this.state.nTitle;
        if (this.state.nContent) this.state.blog.content = this.state.nContent;

        try {
            this.saving = true;
            let url = '/api/blogs/update/' + this.state.blog.title + '/' + this.state.blog.content + '/' + this.state.id;
            let result = await json(url, 'PUT');

            if (result) {
                this.props.history.push('/');
            }
        } catch (e) {
            throw e;
        } finally {
            this.saving = false;
        }

    }

    DeleteBlog = () => {
        let url = '/api/blogs/delete/' + this.state.id;
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'same-origin'
        }).then(response => {           
            this.props.history.push('/');
        });
    }
}

interface IAdminProps extends RouteComponentProps< {id: string} > {

}

interface Blog {
    id: string, 
    title: string,
    content: string,
    authorid: string,
    _created: string
}

interface IAdminState {
    blog: Blog,
    id: string,
    nTitle: string,
    nContent: string
}

export default Admin;