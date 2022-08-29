import React from 'react'
import '../login2.css'


function Login2() {
  return (
    <div>
        <section className="container">
      <div className="columns is-multiline">
        <div className="column is-8 is-offset-2 register">
          <div className="columns">
            <div className="column left">
              <h1 className="title is-1">Super Cool Website</h1>
              <h2 className="subtitle colored is-4">Lorem ipsum dolor sit amet.</h2>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis ex deleniti aliquam tempora libero excepturi vero soluta odio optio sed.</p>
            </div>
            <div className="column right has-text-centered">
              <h1 className="title is-4">Sign up today</h1>
              <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
              <form>
                <div className="field">
                  <div className="control">
                    <input className="input is-medium" type="text" placeholder="Name"></input>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <input className="input is-medium" type="email" placeholder="Email"></input>
                  </div>
                </div>
                <button className="button is-block is-primary is-fullwidth is-medium">Submit</button>
                <br />
                <small><em>Lorem ipsum dolor sit amet consectetur.</em></small>
              </form>
            </div>
          </div>
        </div>
        <div className="column is-8 is-offset-2">
          <br></br>
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <span className="icon">
                  <i className="fab fa-twitter"></i>
                </span> &emsp;
                <span className="icon">
                  <i className="fab fa-facebook"></i>
                </span> &emsp;
                <span className="icon">
                  <i className="fab fa-instagram"></i>
                </span> &emsp;
                <span className="icon">
                  <i className="fab fa-github"></i>
                </span> &emsp;
                <span className="icon">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div className="level-right">
              <small className="level-item" >
                &copy; Super Cool Website. All Rights Reserved.
              </small>
            </div>
          </nav>
        </div>
      </div>
    </section>
    </div>
    
  )
}

export default Login2