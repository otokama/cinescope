# CineScope
A movie search and discovery app built on top of [TMDb API](https://developer.themoviedb.org/docs) using React, TypeScript, Express and Node. 

## Features:
- Search for movies and TV shows from a comprehensive database (by TMDb)
- Save favorite list of movies / TV shows
- ...

## How to run:
For *demo* purposes, you can run a single container which serves the backend and frontend:
1. Build the docker image:
```
docker build -t cinescope:latest -f Dockerfile .
```
2. Run a docker container from the image:
```
docker run --cpus=1 -d -p 80:3000 cinescope:latest
```
3. Visit `http://localhost` for the demo.


## Tools and Libraries:
### UI & Styling:
- [Chakra UI](https://github.com/chakra-ui/chakra-ui)
- [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component)

### State Management:
- Client State:
  - [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- Server State:
  - [React Query](https://github.com/tanstack/query)
