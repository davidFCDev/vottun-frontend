export const deployErc721 = async (name, symbol, network, gasLimit, alias) => {
    const requestBody = {
        name,
        symbol,
        network,
        gasLimit,
        alias
    };

    try {
        const response = await fetch(`https://api.vottun.tech/erc/v1/erc721/deploy`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
                'x-application-vkn': import.meta.env.VITE_APP_ID
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch token');
        }

        return response.json();
    } catch (error) {
        throw new Error('Failed to fetch token: ' + error.message);
    }
}


