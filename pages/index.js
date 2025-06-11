import Head from 'next/head'
import { Home } from '@/pages/Home/Home';

const Page = (props) => {
	return (
		<>
			<Head>
				<title>Разработка сайтов любой сложности. Создание сайтов под ключ — DDQ</title>
				<meta name="description" content="Разработка и создание сайтов любой сложности: лэндинги, интернет-магазины, бизнес сайты, каталоги и т.д. Индивидуальный и креативный подход, поэтапная разработка сайтов под ключ по всей России."></meta>
				<link rel="canonical" href="https://ddq.ru/" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Prata&display=swap" rel="stylesheet"></link>
			</Head>
			<Home {...props} />
		</>
	);
};

export default Page;