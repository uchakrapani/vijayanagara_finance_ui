import React, { useEffect, useState } from 'react';

const RunningTime = () => {
    const [startTime] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    };

    return (
        <div style={{ textAlign: 'center', color: '#fff' }}>
            Running Time: {formatTime(elapsedTime)}
        </div>
    );
};

export default RunningTime;
