import Head from 'next/head';

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<title>iC BF</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="container">
				<div className="content">
					{children}
				</div>
			</div>
		</>
	)
}
