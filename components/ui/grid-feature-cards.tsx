"use client";
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

type FeatureType = {
	title: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	description: string;
};

export function GridPatternBackground() {
	const [p, setP] = useState<number[][]>([]);

	useEffect(() => {
		setP(genRandomPattern());
	}, []);

	return (
		<div className="pointer-events-none absolute top-0 left-0 w-full h-full [mask-image:linear-gradient(white,transparent)] z-0">
			<div className="absolute inset-0 bg-gradient-to-r from-zinc-500/10 to-zinc-500/0 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
				<GridPattern
					width={20}
					height={20}
					x="-1"
					y="-1"
					squares={p}
					className="fill-zinc-800/10 stroke-zinc-800/30 absolute inset-0 h-full w-full mix-blend-overlay"
				/>
			</div>
		</div>
	);
}

type FeatureCardPorps = React.ComponentProps<'div'> & {
	feature: FeatureType;
};

export function FeatureCard({ feature, className, ...props }: FeatureCardPorps) {
	return (
		<div className={cn('relative overflow-hidden p-6', className)} {...props}>
			<GridPatternBackground />
			<feature.icon className="text-foreground/75 size-6 relative z-20" strokeWidth={1} aria-hidden />
			<h3 className="mt-10 text-sm md:text-base relative z-20">{feature.title}</h3>
			<p className="text-muted-foreground relative z-20 mt-2 text-xs font-light">{feature.description}</p>
		</div>
	);
}

export function GridPattern({
	width,
	height,
	x,
	y,
	squares,
	...props
}: React.ComponentProps<'svg'> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
	const patternId = React.useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
			{squares && (
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(([x, y], index) => (
						<rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
					))}
				</svg>
			)}
		</svg>
	);
}

function genRandomPattern(length?: number): number[][] {
	length = length ?? 5;
	return Array.from({ length }, () => [
		Math.floor(Math.random() * 20), // random x between 0 and 20
		Math.floor(Math.random() * 15), // random y between 0 and 15
	]);
}