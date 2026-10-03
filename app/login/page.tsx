"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function Login() {
 const supabase=createClient(), router=useRouter();
 const [signup,setSignup]=useState(false),[name,setName]=useState(""),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[msg,setMsg]=useState(""),[busy,setBusy]=useState(false);
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);setMsg("");const r=signup?await supabase.auth.signUp({email,password,options:{data:{full_name:name}}}):await supabase.auth.signInWithPassword({email,password});if(r.error)setMsg(r.error.message);else if(signup)setMsg("Account created. Verify email if required, then login.");else router.push("/");setBusy(false);}
 return <main className="authpage"><form className="authbox" onSubmit={submit}><a href="/" className="back">← MPSC Library</a><h1>{signup?"Create account":"Login"}</h1><p className="muted">{signup?"Join the MPSC study community.":"Login to upload study material."}</p>{signup&&<input required placeholder="Full name" value={name} onChange={e=>setName(e.target.value)}/>}<input required type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><input required minLength={6} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>{msg&&<div className="notice">{msg}</div>}<button disabled={busy} className="btn primary">{busy?"Please wait…":signup?"Create Account":"Login"}</button><button type="button" className="linkbtn" onClick={()=>{setSignup(!signup);setMsg("")}}>{signup?"Already have an account? Login":"New student? Create an account"}</button></form></main>;
}