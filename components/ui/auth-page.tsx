'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { createClient } from '@/utils/supabase/client';

import {
	AtSignIcon,
	ChevronLeftIcon,
	Loader2
} from 'lucide-react';
import { Input } from './input';
import { Logo } from './logo';
import PixelBlast from './pixel-blast';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function AuthPage({ mode = 'login' }: { mode?: 'login' | 'signup' }) {
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const supabase = createClient();
	const { toast } = useToast();

	const handleEmailAuth = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) return;
		
		setIsLoading(true);
		
		// For OTP, login and signup are functionally the same API
		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`,
			},
		});

		if (error) {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		} else {
			toast({
				title: "Check your email",
				description: mode === 'login' ? "We sent you a login link." : "We sent you a signup link.",
			});
		}
		setIsLoading(false);
	};

	const handleSocialLogin = async (provider: 'google' | 'github') => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${location.origin}/auth/callback`,
			},
		});
		
		if (error) {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		}
	};

	return (
		<main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2 bg-[#050505] text-white">
			<div className="bg-black relative hidden h-full flex-col border-r border-zinc-800 p-10 lg:flex overflow-hidden">
				<div className="z-10 flex items-center gap-2 text-white">
					<Logo className="w-6 h-6" />
					<p className="text-xl font-black tracking-[0.2em] uppercase">DEEPNERD</p>
				</div>
				
				{/* Background Abstract Lines overlay mimicking terminal background */}
				<PixelBlast className="absolute inset-0 opacity-40 mix-blend-screen" />
			</div>
			<div className="relative flex min-h-screen flex-col justify-center p-4 bg-[#050505]">
				
				<Button variant="outline" className="absolute top-7 left-5 bg-black border-zinc-800 text-white hover:bg-zinc-900 font-technical-label uppercase tracking-widest" asChild>
					<a href="/">
						<ChevronLeftIcon className='w-4 h-4 mr-2' />
						Home
					</a>
				</Button>
				<div className="mx-auto space-y-8 sm:w-[350px]">
					<div className="flex items-center gap-2 lg:hidden text-white">
						<Logo className="w-6 h-6" />
						<p className="text-xl font-black tracking-[0.2em] uppercase">DEEPNERD</p>
					</div>
					<div className="flex flex-col space-y-2">
						<h1 className="font-technical-label text-2xl uppercase tracking-widest text-white">
							{mode === 'login' ? 'INIT_SESSION' : 'REGISTER_ENTITY'}
						</h1>
						<p className="text-zinc-400 text-sm">
							{mode === 'login' ? 'Authenticate to access the autonomous workspace.' : 'Initialize a new system record.'}
						</p>
					</div>
					<div className="space-y-3">
						<Button type="button" size="lg" className="w-full bg-black border border-zinc-800 text-white hover:border-zinc-500 hover:bg-zinc-900 transition-colors" onClick={() => handleSocialLogin('google')}>
							<GoogleIcon className='w-5 h-5 mr-3' />
							Continue with Google
						</Button>
						<Button type="button" size="lg" className="w-full bg-black border border-zinc-800 text-white hover:border-zinc-500 hover:bg-zinc-900 transition-colors" onClick={() => handleSocialLogin('github')}>
							<CustomGithubIcon className='w-5 h-5 mr-3' />
							Continue with GitHub
						</Button>
					</div>

					<AuthSeparator />

					<form className="space-y-4" onSubmit={handleEmailAuth}>
						<p className="text-zinc-400 text-start text-xs font-technical-label uppercase tracking-widest">
							// OR_PROVIDE_CREDENTIALS
						</p>
						<div className="relative h-max">
							<Input
								placeholder="admin@deepnerd.sys"
								className="peer pl-10 bg-black border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-700"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<div className="text-zinc-600 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
								<AtSignIcon className="w-4 h-4" aria-hidden="true" />
							</div>
						</div>

						<Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200 font-technical-label uppercase tracking-widest" disabled={isLoading}>
							{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
							<span>{mode === 'login' ? 'EXECUTE_LOGIN' : 'EXECUTE_SIGNUP'}</span>
						</Button>
					</form>
					<div className="text-center mt-4 font-technical-label text-xs uppercase tracking-widest text-zinc-500">
						{mode === 'login' ? (
							<p>NO RECORD FOUND? <a href="/signup" className="text-white hover:text-zinc-300 underline underline-offset-2">INITIALIZE_NEW</a></p>
						) : (
							<p>EXISTING RECORD? <a href="/login" className="text-white hover:text-zinc-300 underline underline-offset-2">AUTHENTICATE</a></p>
						)}
					</div>
					<p className="text-zinc-500 mt-8 text-xs text-center font-technical-label uppercase tracking-widest">
						CONNECTION IMPLIES ACCEPTANCE OF{' '}
						<a
							href="/terms"
							className="text-zinc-400 hover:text-white underline underline-offset-4 transition-colors"
						>
							TERMS
						</a>{' '}
						&{' '}
						<a
							href="/privacy"
							className="text-zinc-400 hover:text-white underline underline-offset-4 transition-colors"
						>
							POLICY
						</a>
						.
					</p>
				</div>
			</div>
		</main>
	);
}

const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
	<svg viewBox="0 0 24 24" {...props}>
		<path
			d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
			fill="#4285F4"
		/>
		<path
			d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
			fill="#34A853"
		/>
		<path
			d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
			fill="#FBBC05"
		/>
		<path
			d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
			fill="#EA4335"
		/>
	</svg>
);

const CustomGithubIcon = (props: React.ComponentProps<'svg'>) => (
	<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
		<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
	</svg>
);

const AuthSeparator = () => {
	return (
		<div className="flex w-full items-center justify-center">
			<div className="bg-zinc-800 h-px w-full" />
			<span className="text-zinc-600 px-4 text-xs font-technical-label uppercase tracking-widest">OR</span>
			<div className="bg-zinc-800 h-px w-full" />
		</div>
	);
};