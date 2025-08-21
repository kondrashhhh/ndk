import UAParser from 'ua-parser-js';
import App from 'next/app';
import { BrowserContext } from '@/context/BrowserContext';
import { PopUpProvider } from '@/context/PopUpContext';
import { Metrika } from '@/components/Metrika/Metrika';
import '@/styles/global.scss';


export default function MyApp({ Component, pageProps, error }) {
	if (error) {
		return (
			<Error statusCode={error.statusCode} />
		);
	}

	return (
		<BrowserContext.Provider value={{
			deviceType: pageProps.deviceType,
			browserName: pageProps.browserName,
		}}>
			<PopUpProvider>
				<Metrika />
				<noscript>
					<div>
						<img 
							src="https://mc.yandex.ru/watch/103842330" 
							style={{ position: 'absolute', left: '-9999px' }} 
							alt="" 
						/>
					</div>
				</noscript>
                <Component {...pageProps} />
			</PopUpProvider>
		</BrowserContext.Provider>
	);
};

MyApp.getInitialProps = async (appContext) => {	
	const appProps = await App.getInitialProps(appContext);
	const { ctx } = appContext;
	const { res } = ctx;

	if (ctx.query.goto) {
		if (res) {
			res.statusCode = 404;
		}

		return {
			...appProps,
			error: {
				statusCode: 404,
			},
		};
	}

	const userAgent = ctx?.req?.headers?.['user-agent'] || window.navigator.userAgent || '';
	const uaParser = new UAParser(userAgent);
	const deviceType = uaParser.getDevice().type;
	const browserName = uaParser.getBrowser().name;

	return {
		...appProps,
		pageProps: {
			...appProps.pageProps,
			deviceType,
			browserName
		}
	};
};