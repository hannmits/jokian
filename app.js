const generateSchedule = (city) => {
    const dates = [];
    const startDate = new Date(2025, 2, 1); // 1 Maret 2025
    
 
    for(let i = 0; i < 30; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        dates.push(currentDate);
    }

  
    const cityData = {
        jakarta: { imsak: '04:15', subuh: '04:25', terbit: '05:45', maghrib: '18:05' },
        surabaya: { imsak: '04:00', subuh: '04:10', terbit: '05:30', maghrib: '17:50' },
        semarang: { imsak: '04:10', subuh: '04:20', terbit: '05:40', maghrib: '18:00' }
    };

    const scheduleHTML = `
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Imsak</th>
                <th>Subuh</th>
                <th>Terbit</th>
                <th>Dzuhur</th>
                <th>Ashar</th>
                <th>Maghrib</th>
                <th>Isya</th>
            </tr>
        </thead>
        <tbody>
            ${dates.map((date, index) => {
                const day = date.getDate();
                const month = date.toLocaleString('id-ID', { month: 'long' });
                const time = {
                    imsak: addMinutes(cityData[city].imsak, index),
                    subuh: addMinutes(cityData[city].subuh, index),
                    terbit: addMinutes(cityData[city].terbit, index),
                    maghrib: addMinutes(cityData[city].maghrib, index)
                };
                
                return `
                    <tr>
                        <td>${day} ${month}</td>
                        <td>${time.imsak}</td>
                        <td>${time.subuh}</td>
                        <td>${time.terbit}</td>
                        <td>${addMinutes('12:00', index)}</td>
                        <td>${addMinutes('15:15', index)}</td>
                        <td>${time.maghrib}</td>
                        <td>${addMinutes('19:30', index)}</td>
                    </tr>
                `;
            }).join('')}
        </tbody>
    `;

    document.getElementById('schedule').innerHTML = scheduleHTML;
};


function addMinutes(time, minutesToAdd) {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + minutesToAdd);
    return date.toTimeString().slice(0, 5);
}


document.getElementById('citySelect').addEventListener('change', (e) => {
    generateSchedule(e.target.value);
});


generateSchedule('jakarta');