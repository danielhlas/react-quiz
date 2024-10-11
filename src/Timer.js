function Timer({time}) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return (
        <div className="timer">
            
           {minutes < 10 && "0"}{minutes}:
           {seconds < 10 && "0"}{seconds}
           
        </div>
    )
}

export default Timer
