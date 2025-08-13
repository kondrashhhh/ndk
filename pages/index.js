import Head from 'next/head'
import { Home } from '@/pages/Home/Home';

const Page = (props) => {
	return (
		<>
			<Head>
			</Head>
			<Home {...props} />
		</>
	);
};

export default Page;