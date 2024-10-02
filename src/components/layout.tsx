"use client";

import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import {
	ThirdwebProvider,
	metamaskWallet,
	coinbaseWallet,
	walletConnect,
} from "@thirdweb-dev/react";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<ThirdwebProvider
			supportedWallets={[
				metamaskWallet({
					recommended: true,
				}),
				coinbaseWallet(),
				walletConnect(),
			]}
			clientId="<your_client_id>"
		>
			<ThemeProvider>
				{children}
			</ThemeProvider>
		</ThirdwebProvider>
	);
}

export default Layout;