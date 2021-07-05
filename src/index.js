import {
  Composition,
  continueRender,
  delayRender,
  getInputProps,
  registerRoot,
} from "remotion";
import { Video } from "./video";
import { fetchStargazers } from "./fetch";

const FPS = 120;

const defaultProps = {
  repoOrg: "code-hike",
  repoName: "codehike",
  starCount: 100,
  duration: 15,
};
const inputProps = { ...defaultProps, ...getInputProps() };

function RemotionVideo() {
  const [handle] = React.useState(() => delayRender());
  const [stargazers, setStargazers] = React.useState([]);

  React.useEffect(() => {
    const { repoOrg, repoName, starCount } = inputProps;
    fetchStargazers(repoOrg, repoName, starCount).then((stargazers) => {
      setStargazers(stargazers);
      continueRender(handle);
    });
  }, [handle]);

  return (
    <Composition
      id="main"
      component={Video}
      durationInFrames={FPS * inputProps.duration}
      fps={FPS}
      width={3840}
      height={2160}
      defaultProps={{
        ...inputProps,
        stargazers,
      }}
    />
  );
}

registerRoot(RemotionVideo);
