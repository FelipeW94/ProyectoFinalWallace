const Loader = ({ text = 'Cargando...' }) => {
  return (
    <div className="loader" role="status">
      <span className="loader-dot" />
      {text}
    </div>
  )
}

export default Loader
