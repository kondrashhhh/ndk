import Head from 'next/head'
import { Home } from '@/pages/Home/Home';

const Page = (props) => {
	return (
		<>
			<Head>
				<title>НОВОСЕЛЬЕ девелопмент. Квартиры в НОВОСЕЛЬЕ</title>
				<meta name="description" content="Квартиры в проекте ЖК Уютный: городские кварталы от застройщика НОВОСЕЛЬЕ девелопмент. Дома комфорт-класса в районе Новоселье. План квартир, площадь, количество комнат можно увидеть на сайте. Остались вопросы? Звоните +7 812 309-77-77"></meta>
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