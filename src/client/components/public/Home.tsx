import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json } from '../../utils/api';

class Home extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            blogA: [],
            refresh: ''
        };
    }

    async componentDidMount() {
        try {
            let blogData = await json('/api/blogs');

            // set blogdata to state for render
            this.setState({blogA: blogData});    
            
            // convert ids to author names
            for(let blog of this.state.blogA) {
                let r2 = await fetch('/api/authors/name/' + blog.authorid);
                let res2 = await r2.json();
                let authorName = res2[0]['name'];
                blog.authorid = authorName;

                // format date
                blog._created = blog._created.slice(0, 10);
            }
            this.setState({refresh: 'go'}); // forces rerender after array update
            
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return ( //render boxes with blog data
            <div className='container d-flex flex-wrap'>  
                <div className='row w-100 justify-content-center'>
                    {this.state.blogA.map((blog, index) => {                      
                        if (blog.title) return (
                            <div key={'blog-' + index} className="card shadow m-4 p-0 col-md-3">
                                <div className="card-header"><h5 className="card-title bg-grey">{blog.title}</h5></div>
                                <div className="card-body">
                                    <h5 className="card-text">{blog.authorid}</h5>
                                    <h5 className="card-text">{blog._created}</h5>
                                    <hr></hr>
                                    <button type="submit" className="btn btn-secondary" onClick={() => { this.props.history.push('/blog/view/'+blog.id+'/'+blog.authorid) }}>
                                        View Blog
                                    </button>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        );
    }
}

interface BlogPreview {
    id: string,
    title: string,
    authorid: string,
    _created: string
}

export interface IAppProps extends RouteComponentProps {

}

export interface IAppState {
    blogA: Array<BlogPreview>;
    refresh: string
}

export default Home;