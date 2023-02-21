# idontwannalogtime
## What is this?
This is a simple utility that lets you log time (sike!). It's an open source project.

<div class="image-container">
    <img width="711" alt="Screenshot 2023-02-21 at 3 03 19 PM" src="https://user-images.githubusercontent.com/8301755/220272363-3a61e8c0-c6b7-4983-8024-e26661192817.png">
</div>

## How do I setup this project on my local?
Simple! Clone the repo and add in the values for your own MongoDB cluster in the `.env` file. Then run `yarn start` on the project repo. Alternatively, you can `cd` into the individual folders for `backend` and `frontend` and run the following commands:
- backend: `yarn start:dev`
- frontend: `yarn start`

<style>
    .image-container {
        display: grid;
        place-items: center;
        padding: 2rem;
        border-radius: 1rem;
    }

    .image-container img {
        box-shadow: 1px 15px 33px -23px rgba(0,0,0,0.69);
        -webkit-box-shadow: 1px 15px 33px -23px rgba(0,0,0,0.69);
        -moz-box-shadow: 1px 15px 33px -23px rgba(0,0,0,0.69);
        border-radius: 5px;
    }
</style>
