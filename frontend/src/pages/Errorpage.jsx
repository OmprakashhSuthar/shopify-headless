export default function Errorpage({ errorMsg }) {
  return <>{errorMsg ? errorMsg : <h1>Page not found!</h1>}</>;
}
