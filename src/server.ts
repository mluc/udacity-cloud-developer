import bodyParser from "body-parser";
import express, { Request, Response, Router } from "express";
import {deleteLocalFiles, filterImageFromURL} from "./util/util";

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // http://localhost:8082/filteredimage?image_url=https://udagram-mluc-dev.s3.amazonaws.com/hqUy9kw.jpg
  app.get( "/filteredimage/", async ( req: Request, res: Response ) => {
    const { image_url } = req.query;
    if ( !image_url ) {
      return res.status(400)
          .send(`image_url is required`);
    }
    try {
      const filteredPath = await filterImageFromURL(image_url);
      res.sendFile(filteredPath);
      res.on("finish", () => {
        deleteLocalFiles([filteredPath]);
      });
      res.status(200);
    } catch (e) {
      return res.status(422)
          .send(e);
    }
  } );

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}");
  } );

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
