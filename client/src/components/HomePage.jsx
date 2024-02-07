import React from 'react';

const HomePage = () => {
  return (
    <div>
      <nav className='navbar'>
        <h2><i className="zmdi zmdi-blogger"></i>log App</h2>
        <ul>
          <li className='reg-btn'><a href='/login'>Login</a></li>
        </ul>
      </nav>

      <main className='hero-page'>
        <div className='content'>
          <h2><span>Welcome</span> in the world of blog</h2>
          <p>Create a unique and beautiful blog easily.</p>
          <a href="/login">CREATE YOUR BLOG</a>
        </div>
      </main>
    </div>
  )
}

export default HomePage;