"use client";

import React from 'react'
import { useState, useEffect } from 'react'
import {signIn, signOut, useSession, getProviders} from "next-auth/react"
import Link from "next/link";


const Navbar = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
  }, [])

  return (
    <header>
      <nav>
      { isUserLoggedIn ? (
        <div>
        <Link href="/">Home</Link>
        <Link href="/create-post">Create Post</Link>
        <button type='submit' onClick={signOut}>SignOut</button>
        <Link href="/profile">Profile</Link>
        </div>
      ): (
        <>
        <p>Not logged in</p>
        {providers && Object.values(providers).map((provider) => (
          <button
          type='button'
          key={provider.name}
          onClick={() => signIn(provider.id)}
          >signIn</button>
        ))}
        </>
      )
      }
      </nav>
    </header>
  )
}

export default Navbar