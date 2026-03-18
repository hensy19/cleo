import './Loader.css'

export default function Loader({ size = 'medium', fullscreen = false }) {
  if (fullscreen) {
    return (
      <div className="loader-fullscreen">
        <div className={`spinner spinner-${size}`}></div>
        <p>Loading...</p>
      </div>
    )
  }

  return <div className={`spinner spinner-${size}`}></div>
}
