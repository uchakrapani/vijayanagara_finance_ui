import React, { useEffect, useState } from 'react';

const RunningTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatDateTime = (date) => {
        return date.toLocaleString(); // Formats date and time to the local timezone
    };

    return (
        <div style={{ textAlign: 'center', color: '#fff' }}>
            Current Date and Time: {formatDateTime(currentTime)}
        </div>
    );
};

export default RunningTime;
