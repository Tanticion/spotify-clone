import spotifyWebApi from "spotify-web-api-node";
export default function handler(req, res) {
  const refreshToken = req.body.refreshToken;
	const spotifyApi = new spotifyWebApi({
		redirectUri: "http://localhost:3000",
		clientId: "7f16edd9e41e45b79bcc064c4a02717d",
        clientSecret: "572437c80e93481c980e34a7f5d302f0",
        refreshToken: refreshToken
	});
	spotifyApi
		.refreshAccessToken()
		.then((data) => {
	
            res.json({
				accessToken: data.body.access_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch((err) => {
		});
}
