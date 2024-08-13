// Next Imports
import Preview from '@/views/apps/kundli/preview/page'
import { redirect } from 'next/navigation'

// Component Imports

// Data Imports
// import { getInvoiceData } from '@/app/server/actions'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/invoice` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */
/* const getInvoiceData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/invoice`)

  if (!res.ok) {
    throw new Error('Failed to fetch invoice data')
  }

  return res.json()
} */
const PreviewPage = async ({ params }) => {
  // Vars
  // const data = await getInvoiceData()
  const kundliData = {
    "AstroVastuReport": {
      "BirthDetails": {
        "KundaliID": "54894EB0DF5D4BD6BD605DE2C6B0B99E",
        "FirstName": "KANCHANLAL",
        "MiddleName": "I.",
        "LastName": "SHARMA",
        "Gender": "Male",
        "Date": "23-09-1955",
        "Time": "2240",
        "City": "Surat",
        "State": "Gujarat",
        "Country": "India",
        "FormattedCity": "Surat, Gujarat",
        "Lat": "21.1702",
        "Lng": "72.8311",
        "Prakriti": "_________"
      },
      "AstroDetails": {
        "Rashi": "Sagittarius",
        "VikramSamvat": "2012, Jyeshtha 23",
        "JanmaTithi": "Shukla Ashtami",
        "JanmaYoga": "Ayushmana",
        "JanmaKarana": "Vishti",
        "AstroWeekday": "Friday",
        "WesternWeekday": "Friday",
        "SunRiseTime": "06:30 AM",
        "Nakshatra": {
          "Nakshatra": "Mula",
          "PlanetName": "Ketu",
          "Pada": 1,
          "Gana": "R",
          "Gender": "N",
          "TriGuna": "SRR"
        },
        "Dasha": {
          "DashaPlanet": "Ketu",
          "DashaStart": "21-09-1954",
          "RemainingYears": 5,
          "RemainingMonths": 0,
          "RemainingDays": 363
        },
        "Numerology": {
          "BirthNumber": 5,
          "BirthNumberYears": "1958, 1967, 1976, 1985, 1994, 2003, 2012, 2021, 2030",
          "DestinyNumber": 7,
          "DestinyNumberYears": "1960, 1969, 1978, 1987, 1996, 2005, 2014, 2023, 2032",
          "DestinyYear": 1989,
          "DestinyYearNumber": 34
        }
      },
      "DashaDetails": {
        "CurrentMDYears": 16,
        "CurrentMD": "Jupiter",
        "CurrentAD": "Jupiter",
        "CurrentPD": "Rahu",
        "MahaDasha": [
          {
            "Planet": "Ketu",
            "DashaPlanet": "Ketu",
            "StartDate": "1954-09-21T22:40:00+05:30",
            "EndDate": "1961-09-21T22:40:00+05:30",
            "StartDt": "21-09-1954",
            "EndDt": "21-09-1961",
            "IsCurrent": false
          },
          {
            "Planet": "Venus",
            "DashaPlanet": "Venus",
            "StartDate": "1961-09-21T22:40:00+05:30",
            "EndDate": "1981-09-21T22:40:00+05:30",
            "StartDt": "21-09-1961",
            "EndDt": "21-09-1981",
            "IsCurrent": false
          },
          {
            "Planet": "Sun",
            "DashaPlanet": "Sun",
            "StartDate": "1981-09-21T22:40:00+05:30",
            "EndDate": "1987-09-21T22:40:00+05:30",
            "StartDt": "21-09-1981",
            "EndDt": "21-09-1987",
            "IsCurrent": false
          },
          {
            "Planet": "Moon",
            "DashaPlanet": "Moon",
            "StartDate": "1987-09-21T22:40:00+05:30",
            "EndDate": "1997-09-21T22:40:00+05:30",
            "StartDt": "21-09-1987",
            "EndDt": "21-09-1997",
            "IsCurrent": false
          },
          {
            "Planet": "Mars",
            "DashaPlanet": "Mars",
            "StartDate": "1997-09-21T22:40:00+05:30",
            "EndDate": "2004-09-21T22:40:00+05:30",
            "StartDt": "21-09-1997",
            "EndDt": "21-09-2004",
            "IsCurrent": false
          },
          {
            "Planet": "Rahu",
            "DashaPlanet": "Rahu",
            "StartDate": "2004-09-21T22:40:00+05:30",
            "EndDate": "2022-09-21T22:40:00+05:30",
            "StartDt": "21-09-2004",
            "EndDt": "21-09-2022",
            "IsCurrent": false
          },
          {
            "Planet": "Jupiter",
            "DashaPlanet": "Jupiter",
            "StartDate": "2022-09-21T22:40:00+05:30",
            "EndDate": "2038-09-21T22:40:00+05:30",
            "StartDt": "21-09-2022",
            "EndDt": "21-09-2038",
            "IsCurrent": true
          },
          {
            "Planet": "Saturn",
            "DashaPlanet": "Saturn",
            "StartDate": "2038-09-21T22:40:00+05:30",
            "EndDate": "2057-09-21T22:40:00+05:30",
            "StartDt": "21-09-2038",
            "EndDt": "21-09-2057",
            "IsCurrent": false
          },
          {
            "Planet": "Mercury",
            "DashaPlanet": "Mercury",
            "StartDate": "2057-09-21T22:40:00+05:30",
            "EndDate": "2074-09-21T22:40:00+05:30",
            "StartDt": "21-09-2057",
            "EndDt": "21-09-2074",
            "IsCurrent": false
          }
        ],
        "AntarDasha": [
          {
            "Planet": "Jupiter",
            "DashaPlanet": "Jupiter-Jupiter",
            "StartDate": "2022-09-21T22:40:00+05:30",
            "EndDate": "2024-11-09T03:28:00+05:30",
            "StartDt": "21-09-2022",
            "EndDt": "09-11-2024",
            "IsCurrent": true
          },
          {
            "Planet": "Saturn",
            "DashaPlanet": "Jupiter-Saturn",
            "StartDate": "2024-11-09T03:28:00+05:30",
            "EndDate": "2027-05-23T10:39:59.9999999+05:30",
            "StartDt": "09-11-2024",
            "EndDt": "23-05-2027",
            "IsCurrent": false
          },
          {
            "Planet": "Mercury",
            "DashaPlanet": "Jupiter-Mercury",
            "StartDate": "2027-05-23T10:39:59.9999999+05:30",
            "EndDate": "2029-08-28T08:15:59.9999998+05:30",
            "StartDt": "23-05-2027",
            "EndDt": "28-08-2029",
            "IsCurrent": false
          },
          {
            "Planet": "Ketu",
            "DashaPlanet": "Jupiter-Ketu",
            "StartDate": "2029-08-28T08:15:59.9999998+05:30",
            "EndDate": "2030-08-04T05:51:59.9999997+05:30",
            "StartDt": "28-08-2029",
            "EndDt": "04-08-2030",
            "IsCurrent": false
          },
          {
            "Planet": "Venus",
            "DashaPlanet": "Jupiter-Venus",
            "StartDate": "2030-08-04T05:51:59.9999997+05:30",
            "EndDate": "2033-04-04T05:51:59.9999997+05:30",
            "StartDt": "04-08-2030",
            "EndDt": "04-04-2033",
            "IsCurrent": false
          },
          {
            "Planet": "Sun",
            "DashaPlanet": "Jupiter-Sun",
            "StartDate": "2033-04-04T05:51:59.9999997+05:30",
            "EndDate": "2034-01-21T10:39:59.9999996+05:30",
            "StartDt": "04-04-2033",
            "EndDt": "21-01-2034",
            "IsCurrent": false
          },
          {
            "Planet": "Moon",
            "DashaPlanet": "Jupiter-Moon",
            "StartDate": "2034-01-21T10:39:59.9999996+05:30",
            "EndDate": "2035-05-23T10:39:59.9999996+05:30",
            "StartDt": "21-01-2034",
            "EndDt": "23-05-2035",
            "IsCurrent": false
          },
          {
            "Planet": "Mars",
            "DashaPlanet": "Jupiter-Mars",
            "StartDate": "2035-05-23T10:39:59.9999996+05:30",
            "EndDate": "2036-04-28T08:15:59.9999995+05:30",
            "StartDt": "23-05-2035",
            "EndDt": "28-04-2036",
            "IsCurrent": false
          },
          {
            "Planet": "Rahu",
            "DashaPlanet": "Jupiter-Rahu",
            "StartDate": "2036-04-28T08:15:59.9999995+05:30",
            "EndDate": "2038-09-21T22:39:59.9999995+05:30",
            "StartDt": "28-04-2036",
            "EndDt": "21-09-2038",
            "IsCurrent": false
          }
        ],
        "PratyantarDasha": [
          {
            "Planet": "Jupiter",
            "DashaPlanet": "Jupiter-Jupiter-Jupiter",
            "StartDate": "2022-09-21T22:40:00+05:30",
            "EndDate": "2023-01-03T20:06:23.9999999+05:30",
            "StartDt": "21-09-2022",
            "EndDt": "03-01-2023",
            "IsCurrent": false
          },
          {
            "Planet": "Saturn",
            "DashaPlanet": "Jupiter-Jupiter-Saturn",
            "StartDate": "2023-01-03T20:06:23.9999999+05:30",
            "EndDate": "2023-05-07T05:03:59.9999999+05:30",
            "StartDt": "03-01-2023",
            "EndDt": "07-05-2023",
            "IsCurrent": false
          },
          {
            "Planet": "Mercury",
            "DashaPlanet": "Jupiter-Jupiter-Mercury",
            "StartDate": "2023-05-07T05:03:59.9999999+05:30",
            "EndDate": "2023-08-25T14:20:47.9999999+05:30",
            "StartDt": "07-05-2023",
            "EndDt": "25-08-2023",
            "IsCurrent": false
          },
          {
            "Planet": "Ketu",
            "DashaPlanet": "Jupiter-Jupiter-Ketu",
            "StartDate": "2023-08-25T14:20:47.9999999+05:30",
            "EndDate": "2023-10-10T01:13:35.9999998+05:30",
            "StartDt": "25-08-2023",
            "EndDt": "10-10-2023",
            "IsCurrent": false
          },
          {
            "Planet": "Venus",
            "DashaPlanet": "Jupiter-Jupiter-Venus",
            "StartDate": "2023-10-10T01:13:35.9999998+05:30",
            "EndDate": "2024-02-16T22:01:35.9999998+05:30",
            "StartDt": "10-10-2023",
            "EndDt": "16-02-2024",
            "IsCurrent": false
          },
          {
            "Planet": "Sun",
            "DashaPlanet": "Jupiter-Jupiter-Sun",
            "StartDate": "2024-02-16T22:01:35.9999998+05:30",
            "EndDate": "2024-03-26T21:03:59.9999998+05:30",
            "StartDt": "16-02-2024",
            "EndDt": "26-03-2024",
            "IsCurrent": false
          },
          {
            "Planet": "Moon",
            "DashaPlanet": "Jupiter-Jupiter-Moon",
            "StartDate": "2024-03-26T21:03:59.9999998+05:30",
            "EndDate": "2024-05-30T19:27:59.9999998+05:30",
            "StartDt": "26-03-2024",
            "EndDt": "30-05-2024",
            "IsCurrent": false
          },
          {
            "Planet": "Mars",
            "DashaPlanet": "Jupiter-Jupiter-Mars",
            "StartDate": "2024-05-30T19:27:59.9999998+05:30",
            "EndDate": "2024-07-15T06:20:47.9999997+05:30",
            "StartDt": "30-05-2024",
            "EndDt": "15-07-2024",
            "IsCurrent": false
          },
          {
            "Planet": "Rahu",
            "DashaPlanet": "Jupiter-Jupiter-Rahu",
            "StartDate": "2024-07-15T06:20:47.9999997+05:30",
            "EndDate": "2024-11-09T03:27:59.9999996+05:30",
            "StartDt": "15-07-2024",
            "EndDt": "09-11-2024",
            "IsCurrent": true
          }
        ]
      },
      "ChartSVG": {
        "BirthChart": "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI5NS45OTk4bW0iIGhlaWdodD0iNjcuNW1tIiB2ZXJzaW9uPSIxLjEiIHN0eWxlPSJzaGFwZS1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uOyB0ZXh0LXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IGltYWdlLXJlbmRlcmluZzpvcHRpbWl6ZVF1YWxpdHk7IGZpbGwtcnVsZTpldmVub2RkOyBjbGlwLXJ1bGU6ZXZlbm9kZCIgdmlld0JveD0iMCAwIDQ3ODcuMDkgMzM2NS45MyINCiAgICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQoNCiANCiAgICAgICAgICAgIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQogICAgICANCiAgICAgICBAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Ob3RvK1NhbnM6aXRhbCx3Z2h0QDAsNjAwOzEsNTAwJyk7DQoNCiAgICAuZmlsbC1ub256ZXJvIHtmaWxsOiM2NjMzOTk7ZmlsbC1ydWxlOm5vbnplcm99DQogIA0KICAgIC5maWxsLXB1cnBsZSB7ZmlsbDojNjYzMzk5fSAgICAgIA0KICAgIC5ob3VzZS1udW1iZXIge2ZpbGw6IzMzMzMzMzsgZm9udC13ZWlnaHQ6NTAwO2ZvbnQtc2l6ZToxMzZweDtmb250LWZhbWlseTonU2Vnb2UgVUknLCdOb3RvIFNhbnMnfQ0KICAgIC5wbC1uYW1lIHtmaWxsOiM2NjMzOTk7IGZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MTkwcHg7Zm9udC1mYW1pbHk6J1NlZ29lIFVJJywnTm90byBTYW5zJ30NCiAgICAucGwtZGVncmVlIHtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjEyNnB4O2ZvbnQtZmFtaWx5OidTZWdvZSBVSScsJ05vdG8gU2Fucyc7Zm9udC1zdHlsZTogaXRhbGljOyBmaWxsOiM1NTU1NTU7fQ0KDQogICAgLnBsLWtldHUge2ZpbGw6ICM3RDM0MzR9DQogICAgLnBsLXZlbnVzIHtmaWxsOiAjZDY0NmExfQ0KICAgIC5wbC1zdW4ge2ZpbGw6ICNmNDhkMjV9DQogICAgLnBsLW1vb24ge2ZpbGw6ICMwZGM2ZGZ9DQogICAgLnBsLW1hcnMge2ZpbGw6ICNjOTM4Mzg7fQ0KICAgIC5wbC1yYWh1IHtmaWxsOiAjNTU1NTU1O30NCiAgICAucGwtanVwaXRlciB7ZmlsbDogI2ViYmYxMH0NCiAgICAucGwtc2F0dXJuIHtmaWxsOiAjMzY1MmJhO30NCiAgICAucGwtbWVyY3VyeSB7ZmlsbDogIzFjODk0Njt9DQogICAgLnBsLXVyYW51cyB7ZmlsbDogIzRFNkY3Mzt9DQogICAgLnBsLW5lcHR1bmUge2ZpbGw6ICM2YjhhYzY7fQ0KICAgIC5wbC1wbHV0byB7ZmlsbDogI0E2NzA1Qzt9DQoNCiAgICAgICAgICAgIDwvc3R5bGU+DQoNCiAgICAgICAgICAgIDxnIGlkPSJlbGVwaGFudF9hc3Ryb2xvZ3lfbGF5ZV8xIj4NCiAgICAgICAgICAgICAgICA8Zz4NCiAgICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9ImZpbGwtcHVycGxlIiBkPSJNMjQuOTMgMGw0NzM3LjIzIDAgMjQuOTMgMCAwIDI0LjkzIDAgMzMxNi4wNyAwIDI0LjkzIC0yNC45MyAwIC00NzM3LjIzIDAgLTI0LjkzIDAgMCAtMjQuOTMgMCAtMzMxNi4wNyAwIC0yNC45MyAyNC45MyAwem0wIDI0LjkzbDQ3MzcuMjMgMCAwIDMzMTYuMDcgLTQ3MzcuMjMgMCAwIC0zMzE2LjA3eiIvPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICA8Zz4NCiAgICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9ImZpbGwtcHVycGxlIiBkPSJNMzcuOTUgMTY3Mi43OWwyMzQ4LjQ4IC0xNjQzLjU2IDcuMTIgLTQuOTcgNy4xMSA0Ljk3IDIzNDguNDggMTY0My41NyAxNC41NSAxMC4xOCAtMTQuNTUgMTAuMTcgLTIzNDguNDggMTY0My41NiAtNy4xMSA0Ljk4IC03LjExIC00Ljk4IC0yMzQ4LjQ4IC0xNjQzLjU3IC0xNC41NCAtMTAuMTggMTQuNTQgLTEwLjE4em03LjExIDEwLjE4bDIzNDguNDggLTE2NDMuNTYgMjM0OC40OCAxNjQzLjU3IC0yMzQ4LjQ4IDE2NDMuNTYgLTIzNDguNDggLTE2NDMuNTd6Ii8+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgIDxnPg0KICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz0iZmlsbC1ub256ZXJvIiBwb2ludHM9IjQ3NTguNTksMzM0Ni4xIDIxLjM1LDMwLjAzIDI4LjUsMTkuODIgNDc2NS43NCwzMzM1Ljg5ICIvPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICA8Zz4NCiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9ImZpbGwtbm9uemVybyIgcG9pbnRzPSIyMS4zNiwzMzM1Ljg5IDQ3NTguNTksMTkuODIgNDc2NS43NCwzMC4wMyAyOC41MSwzMzQ2LjEgIi8+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICA8dGV4dCB4PSIyMzYyIiB5PSIxNTgxIiBjbGFzcz0iaG91c2UtbnVtYmVyIj4yPC90ZXh0Pg0KPHRleHQgeD0iMTE2OSIgeT0iNzgwIiBjbGFzcz0iaG91c2UtbnVtYmVyIj4zPC90ZXh0Pg0KPHRleHQgeD0iMTAxNyIgeT0iOTAzIiBjbGFzcz0iaG91c2UtbnVtYmVyIj40PC90ZXh0Pg0KPHRleHQgeD0iMjE4NiIgeT0iMTczMiIgY2xhc3M9ImhvdXNlLW51bWJlciI+NTwvdGV4dD4NCjx0ZXh0IHg9IjEwMTciIHk9IjI1NTQiIGNsYXNzPSJob3VzZS1udW1iZXIiPjY8L3RleHQ+DQo8dGV4dCB4PSIxMTY5IiB5PSIyNjkxIiBjbGFzcz0iaG91c2UtbnVtYmVyIj43PC90ZXh0Pg0KPHRleHQgeD0iMjM0NCIgeT0iMTg4MyIgY2xhc3M9ImhvdXNlLW51bWJlciI+ODwvdGV4dD4NCjx0ZXh0IHg9IjM1MzgiIHk9IjI2ODgiIGNsYXNzPSJob3VzZS1udW1iZXIiPjk8L3RleHQ+DQo8dGV4dCB4PSIzNjkwIiB5PSIyNTU0IiBjbGFzcz0iaG91c2UtbnVtYmVyIj4xMDwvdGV4dD4NCjx0ZXh0IHg9IjI1MTIiIHk9IjE3MzIiIGNsYXNzPSJob3VzZS1udW1iZXIiPjExPC90ZXh0Pg0KPHRleHQgeD0iMzY5MCIgeT0iOTEyIiBjbGFzcz0iaG91c2UtbnVtYmVyIj4xMjwvdGV4dD4NCjx0ZXh0IHg9IjM1MDAiIHk9Ijc4MCIgY2xhc3M9ImhvdXNlLW51bWJlciI+MTwvdGV4dD4NCjx0ZXh0IHg9IjIxMjYiIHk9IjEzNTAiIGNsYXNzPSJwbC1uYW1lIj5Bczx0c3BhbiBjbGFzcz0icGwtZGVncmVlIj4gMTk6Mjc8L3RzcGFuPjwvdGV4dD4NCg0KICAgICAgICA8dGV4dCB4PSIyMTI2IiB5PSI5MDAiIGNsYXNzPSJwbC1uYW1lIHBsLWtldHUiPktlPHRzcGFuIGNsYXNzPSJwbC1kZWdyZWUiPiAyNzo0NjwvdHNwYW4+PC90ZXh0Pg0KDQogICAgICAgIA0KICAgICAgICA8dGV4dCB4PSIxMDAiIHk9IjgwNSIgY2xhc3M9InBsLW5hbWUgcGwtdXJhbnVzIj5Vcjx0c3BhbiBjbGFzcz0icGwtZGVncmVlIj4gMDg6MTA8L3RzcGFuPjwvdGV4dD4NCjx0ZXh0IHg9IjEwMCIgeT0iOTk1IiBjbGFzcz0icGwtbmFtZSBwbC1qdXBpdGVyIj5KdTx0c3BhbiBjbGFzcz0icGwtZGVncmVlIj4gMjg6MzE8L3RzcGFuPjwvdGV4dD4NCg0KICAgICAgICA8dGV4dCB4PSI4MTAiIHk9IjE2MzUiIGNsYXNzPSJwbC1uYW1lIHBsLXBsdXRvIj5QbDx0c3BhbiBjbGFzcz0icGwtZGVncmVlIj4gMDQ6MTc8L3RzcGFuPjwvdGV4dD4NCjx0ZXh0IHg9IjgxMCIgeT0iMTgyNSIgY2xhc3M9InBsLW5hbWUgcGwtbWFycyI+TWE8dHNwYW4gY2xhc3M9InBsLWRlZ3JlZSI+IDI0OjA4PC90c3Bhbj48L3RleHQ+DQoNCiAgICAgICAgPHRleHQgeD0iMTAwIiB5PSIyNDU5IiBjbGFzcz0icGwtbmFtZSBwbC1zdW4iPlN1PHRzcGFuIGNsYXNzPSJwbC1kZWdyZWUiPiAwNjozOTwvdHNwYW4+PC90ZXh0Pg0KPHRleHQgeD0iMTAwIiB5PSIyNjQ5IiBjbGFzcz0icGwtbmFtZSBwbC12ZW51cyI+VmU8dHNwYW4gY2xhc3M9InBsLWRlZ3JlZSI+IDEyOjQxPC90c3Bhbj48L3RleHQ+DQoNCiAgICAgICAgPHRleHQgeD0iOTAwIiB5PSIyOTAwIiBjbGFzcz0icGwtbmFtZSBwbC1tZXJjdXJ5Ij5NZTx0c3BhbiBjbGFzcz0icGwtZGVncmVlIj4gMDI6MjM8L3RzcGFuPjwvdGV4dD4NCjx0ZXh0IHg9IjkwMCIgeT0iMzA5MCIgY2xhc3M9InBsLW5hbWUgcGwtbmVwdHVuZSI+TmU8dHNwYW4gY2xhc3M9InBsLWRlZ3JlZSI+IDAzOjQyPC90c3Bhbj48L3RleHQ+DQo8dGV4dCB4PSI5MDAiIHk9IjMyODAiIGNsYXNzPSJwbC1uYW1lIHBsLXNhdHVybiI+U2E8dHNwYW4gY2xhc3M9InBsLWRlZ3JlZSI+IDI0OjM0PC90c3Bhbj48L3RleHQ+DQoNCiAgICAgICAgPHRleHQgeD0iMjEyNiIgeT0iMjU1NCIgY2xhc3M9InBsLW5hbWUgcGwtcmFodSI+UmE8dHNwYW4gY2xhc3M9InBsLWRlZ3JlZSI+IDI3OjQ2PC90c3Bhbj48L3RleHQ+DQoNCiAgICAgICAgPHRleHQgeD0iMzI1MCIgeT0iMzA5MCIgY2xhc3M9InBsLW5hbWUgcGwtbW9vbiI+TW88dHNwYW4gY2xhc3M9InBsLWRlZ3JlZSI+IDAxOjU0PC90c3Bhbj48L3RleHQ+DQoNCiAgICAgICAgDQogICAgICAgIA0KICAgICAgICANCiAgICAgICAgICANCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9zdmc+DQo=",
        "HouseChart": "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI5NS45OTk4bW0iIGhlaWdodD0iNjcuNW1tIiB2ZXJzaW9uPSIxLjEiIHN0eWxlPSJzaGFwZS1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uOyB0ZXh0LXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IGltYWdlLXJlbmRlcmluZzpvcHRpbWl6ZVF1YWxpdHk7IGZpbGwtcnVsZTpldmVub2RkOyBjbGlwLXJ1bGU6ZXZlbm9kZCIgdmlld0JveD0iMCAwIDQ3ODcuMDkgMzM2NS45MyINCiAgICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQoNCiANCiAgICAgICAgICAgIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQogICAgICANCiAgICAgICBAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Ob3RvK1NhbnM6aXRhbCx3Z2h0QDAsNjAwOzEsNTAwJyk7DQoNCiAgICAuZmlsbC1ub256ZXJvIHtmaWxsOiM2NjMzOTk7ZmlsbC1ydWxlOm5vbnplcm99DQogIA0KICAgIC5maWxsLXB1cnBsZSB7ZmlsbDojNjYzMzk5fSAgICAgIA0KICAgIC5ob3VzZS1udW1iZXIge2ZpbGw6IzMzMzMzMzsgZm9udC13ZWlnaHQ6NTAwO2ZvbnQtc2l6ZToxMzZweDtmb250LWZhbWlseTonU2Vnb2UgVUknLCdOb3RvIFNhbnMnfQ0KICAgIC5wbC1uYW1lIHtmaWxsOiM2NjMzOTk7IGZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MTkwcHg7Zm9udC1mYW1pbHk6J1NlZ29lIFVJJywnTm90byBTYW5zJ30NCiAgICAucGwtZGVncmVlIHtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjEyNnB4O2ZvbnQtZmFtaWx5OidTZWdvZSBVSScsJ05vdG8gU2Fucyc7Zm9udC1zdHlsZTogaXRhbGljOyBmaWxsOiM1NTU1NTU7fQ0KDQogICAgLnBsLWtldHUge2ZpbGw6ICM3RDM0MzR9DQogICAgLnBsLXZlbnVzIHtmaWxsOiAjZDY0NmExfQ0KICAgIC5wbC1zdW4ge2ZpbGw6ICNmNDhkMjV9DQogICAgLnBsLW1vb24ge2ZpbGw6ICMwZGM2ZGZ9DQogICAgLnBsLW1hcnMge2ZpbGw6ICNjOTM4Mzg7fQ0KICAgIC5wbC1yYWh1IHtmaWxsOiAjNTU1NTU1O30NCiAgICAucGwtanVwaXRlciB7ZmlsbDogI2ViYmYxMH0NCiAgICAucGwtc2F0dXJuIHtmaWxsOiAjMzY1MmJhO30NCiAgICAucGwtbWVyY3VyeSB7ZmlsbDogIzFjODk0Njt9DQogICAgLnBsLXVyYW51cyB7ZmlsbDogIzRFNkY3Mzt9DQogICAgLnBsLW5lcHR1bmUge2ZpbGw6ICM2YjhhYzY7fQ0KICAgIC5wbC1wbHV0byB7ZmlsbDogI0E2NzA1Qzt9DQoNCiAgICAgICAgICAgIDwvc3R5bGU+DQoNCiAgICAgICAgICAgIDxnIGlkPSJlbGVwaGFudF9hc3Ryb2xvZ3lfbGF5ZV8xIj4NCiAgICAgICAgICAgICAgICA8Zz4NCiAgICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9ImZpbGwtcHVycGxlIiBkPSJNMjQuOTMgMGw0NzM3LjIzIDAgMjQuOTMgMCAwIDI0LjkzIDAgMzMxNi4wNyAwIDI0LjkzIC0yNC45MyAwIC00NzM3LjIzIDAgLTI0LjkzIDAgMCAtMjQuOTMgMCAtMzMxNi4wNyAwIC0yNC45MyAyNC45MyAwem0wIDI0LjkzbDQ3MzcuMjMgMCAwIDMzMTYuMDcgLTQ3MzcuMjMgMCAwIC0zMzE2LjA3eiIvPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICA8Zz4NCiAgICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9ImZpbGwtcHVycGxlIiBkPSJNMzcuOTUgMTY3Mi43OWwyMzQ4LjQ4IC0xNjQzLjU2IDcuMTIgLTQuOTcgNy4xMSA0Ljk3IDIzNDguNDggMTY0My41NyAxNC41NSAxMC4xOCAtMTQuNTUgMTAuMTcgLTIzNDguNDggMTY0My41NiAtNy4xMSA0Ljk4IC03LjExIC00Ljk4IC0yMzQ4LjQ4IC0xNjQzLjU3IC0xNC41NCAtMTAuMTggMTQuNTQgLTEwLjE4em03LjExIDEwLjE4bDIzNDguNDggLTE2NDMuNTYgMjM0OC40OCAxNjQzLjU3IC0yMzQ4LjQ4IDE2NDMuNTYgLTIzNDguNDggLTE2NDMuNTd6Ii8+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgIDxnPg0KICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz0iZmlsbC1ub256ZXJvIiBwb2ludHM9IjQ3NTguNTksMzM0Ni4xIDIxLjM1LDMwLjAzIDI4LjUsMTkuODIgNDc2NS43NCwzMzM1Ljg5ICIvPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICA8Zz4NCiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9ImZpbGwtbm9uemVybyIgcG9pbnRzPSIyMS4zNiwzMzM1Ljg5IDQ3NTguNTksMTkuODIgNDc2NS43NCwzMC4wMyAyOC41MSwzMzQ2LjEgIi8+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICA8dGV4dCB4PSIyMzYyIiB5PSIxNTgxIiBjbGFzcz0iaG91c2UtbnVtYmVyIj4yPC90ZXh0Pg0KPHRleHQgeD0iMTE2OSIgeT0iNzgwIiBjbGFzcz0iaG91c2UtbnVtYmVyIj4zPC90ZXh0Pg0KPHRleHQgeD0iMTAxNyIgeT0iOTAzIiBjbGFzcz0iaG91c2UtbnVtYmVyIj40PC90ZXh0Pg0KPHRleHQgeD0iMjE4NiIgeT0iMTczMiIgY2xhc3M9ImhvdXNlLW51bWJlciI+NTwvdGV4dD4NCjx0ZXh0IHg9IjEwMTciIHk9IjI1NTQiIGNsYXNzPSJob3VzZS1udW1iZXIiPjY8L3RleHQ+DQo8dGV4dCB4PSIxMTY5IiB5PSIyNjkxIiBjbGFzcz0iaG91c2UtbnVtYmVyIj43PC90ZXh0Pg0KPHRleHQgeD0iMjM0NCIgeT0iMTg4MyIgY2xhc3M9ImhvdXNlLW51bWJlciI+ODwvdGV4dD4NCjx0ZXh0IHg9IjM1MzgiIHk9IjI2ODgiIGNsYXNzPSJob3VzZS1udW1iZXIiPjk8L3RleHQ+DQo8dGV4dCB4PSIzNjkwIiB5PSIyNTU0IiBjbGFzcz0iaG91c2UtbnVtYmVyIj4xMDwvdGV4dD4NCjx0ZXh0IHg9IjI1MTIiIHk9IjE3MzIiIGNsYXNzPSJob3VzZS1udW1iZXIiPjExPC90ZXh0Pg0KPHRleHQgeD0iMzY5MCIgeT0iOTEyIiBjbGFzcz0iaG91c2UtbnVtYmVyIj4xMjwvdGV4dD4NCjx0ZXh0IHg9IjM1MDAiIHk9Ijc4MCIgY2xhc3M9ImhvdXNlLW51bWJlciI+MTwvdGV4dD4NCjx0ZXh0IHg9IjIxMjYiIHk9IjEzNTAiIGNsYXNzPSJwbC1uYW1lIj5Bczx0c3BhbiBjbGFzcz0icGwtZGVncmVlIj4gMTk6Mjc8L3RzcGFuPjwvdGV4dD4NCg0KICAgICAgICA8dGV4dCB4PSIyMTI2IiB5PSI5MDAiIGNsYXNzPSJwbC1uYW1lIHBsLWtldHUiPktlPHRzcGFuIGNsYXNzPSJwbC1kZWdyZWUiPiAyNzo0NjwvdHNwYW4+PC90ZXh0Pg0KDQogICAgICAgIDx0ZXh0IHg9IjkwMCIgeT0iNDAwIiBjbGFzcz0icGwtbmFtZSBwbC11cmFudXMiPlVyPHRzcGFuIGNsYXNzPSJwbC1kZWdyZWUiPiAwODoxMDwvdHNwYW4+PC90ZXh0Pg0KDQogICAgICAgIDx0ZXh0IHg9IjEwMCIgeT0iODA1IiBjbGFzcz0icGwtbmFtZSBwbC1qdXBpdGVyIj5KdTx0c3BhbiBjbGFzcz0icGwtZGVncmVlIj4gMjg6MzE8L3RzcGFuPjwvdGV4dD4NCjx0ZXh0IHg9IjEwMCIgeT0iOTk1IiBjbGFzcz0icGwtbmFtZSBwbC1wbHV0byI+UGw8dHNwYW4gY2xhc3M9InBsLWRlZ3JlZSI+IDA0OjE3PC90c3Bhbj48L3RleHQ+DQoNCiAgICAgICAgPHRleHQgeD0iODEwIiB5PSIxNjM1IiBjbGFzcz0icGwtbmFtZSBwbC1tYXJzIj5NYTx0c3BhbiBjbGFzcz0icGwtZGVncmVlIj4gMjQ6MDg8L3RzcGFuPjwvdGV4dD4NCjx0ZXh0IHg9IjgxMCIgeT0iMTgyNSIgY2xhc3M9InBsLW5hbWUgcGwtc3VuIj5TdTx0c3BhbiBjbGFzcz0icGwtZGVncmVlIj4gMDY6Mzk8L3RzcGFuPjwvdGV4dD4NCg0KICAgICAgICA8dGV4dCB4PSIxMDAiIHk9IjIzNjQiIGNsYXNzPSJwbC1uYW1lIHBsLXZlbnVzIj5WZTx0c3BhbiBjbGFzcz0icGwtZGVncmVlIj4gMTI6NDE8L3RzcGFuPjwvdGV4dD4NCjx0ZXh0IHg9IjEwMCIgeT0iMjU1NCIgY2xhc3M9InBsLW5hbWUgcGwtbWVyY3VyeSI+TWU8dHNwYW4gY2xhc3M9InBsLWRlZ3JlZSI+IDAyOjIzPC90c3Bhbj48L3RleHQ+DQo8dGV4dCB4PSIxMDAiIHk9IjI3NDQiIGNsYXNzPSJwbC1uYW1lIHBsLW5lcHR1bmUiPk5lPHRzcGFuIGNsYXNzPSJwbC1kZWdyZWUiPiAwMzo0MjwvdHNwYW4+PC90ZXh0Pg0KDQogICAgICAgIDx0ZXh0IHg9IjkwMCIgeT0iMzA5MCIgY2xhc3M9InBsLW5hbWUgcGwtc2F0dXJuIj5TYTx0c3BhbiBjbGFzcz0icGwtZGVncmVlIj4gMjQ6MzQ8L3RzcGFuPjwvdGV4dD4NCg0KICAgICAgICA8dGV4dCB4PSIyMTI2IiB5PSIyNDU5IiBjbGFzcz0icGwtbmFtZSBwbC1yYWh1Ij5SYTx0c3BhbiBjbGFzcz0icGwtZGVncmVlIj4gMjc6NDY8L3RzcGFuPjwvdGV4dD4NCjx0ZXh0IHg9IjIxMjYiIHk9IjI2NDkiIGNsYXNzPSJwbC1uYW1lIHBsLW1vb24iPk1vPHRzcGFuIGNsYXNzPSJwbC1kZWdyZWUiPiAwMTo1NDwvdHNwYW4+PC90ZXh0Pg0KDQogICAgICAgIA0KICAgICAgICANCiAgICAgICAgDQogICAgICAgIA0KICAgICAgICAgIA0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L3N2Zz4NCg=="
      },
      "AstroVastuHouseScript": [
        {
          "RashiDetails": [
            {
              "RashiNumber": 2,
              "RashiRoman": "II",
              "Rashi": "Taurus",
              "RashiLord": "Venus",
              "Degree": "19:27:51",
              "RashiDescAstro": "Processes, Consistent",
              "RashiDescVastu": "NW, W7",
              "Planets": [
                {
                  "Planet": "Ketu",
                  "PlanetDescAstro": "Intention, Magic, Miracle",
                  "PlanetDescVastu": "Toilet, Hidden, UG Services",
                  "Degree": "27:46:05",
                  "CumulativeDegreeDecimal": 57.7680118,
                  "IsRetro": false,
                  "IsExalted": false,
                  "IsDebilitated": false,
                  "IsCombust": false,
                  "IsUntenanted": false,
                  "IsSelfStar": false,
                  "RashiNumber": 2,
                  "Rashi": "Taurus",
                  "Nakshatra": "Mrigashira",
                  "NakshatraPada": "2",
                  "Devta": "Soma",
                  "EnergyField": "Soma",
                  "PL": {
                    "Planet": "Ketu",
                    "Occupancy": 1,
                    "Ownership": [
                      1,
                      6
                    ],
                    "ScriptFull": "1 / 1, 6"
                  },
                  "NL": {
                    "Planet": "Mars",
                    "Occupancy": 4,
                    "Ownership": [
                      7,
                      12
                    ],
                    "ScriptFull": "4 / 7, 12"
                  },
                  "SL": {
                    "Planet": "Jupiter",
                    "Occupancy": 3,
                    "Ownership": [
                      8,
                      11
                    ],
                    "ScriptFull": "3 / 8, 11"
                  },
                  "NLSL": {
                    "Planet": "Mercury",
                    "Occupancy": 5,
                    "Ownership": [
                      2,
                      5
                    ],
                    "ScriptFull": "5 / 2, 5"
                  },
                  "PHScriptFull": "",
                  "PHScript": [],
                  "PHScriptExtra": [],
                  "PlanetAspectsZero": [],
                  "PlanetAspectsPositive": [],
                  "PlanetAspectsNegative": [
                    {
                      "Aspect": 180,
                      "IsWithRaKe": true,
                      "Planet": "Moon",
                      "PlanetRashi": "Sagittarius",
                      "PlanetRashiShort": "Sag",
                      "ScriptFull": "7 / 3"
                    }
                  ]
                }
              ]
            }
          ],
          "HouseAspectsZero": [],
          "HouseAspectsPositive": [],
          "HouseAspectsNegative": [],
          "House": "1",
          "HouseDescAstro": "Vision, Manifestation",
          "HouseDescVastu": "Personal Belongings, Accessories",
          "Degree": "19:27:51",
          "CumulativeDegreeDecimal": 49.4640760,
          "RashiNumber": 2,
          "Rashi": "Taurus",
          "Nakshatra": "Rohini",
          "NakshatraPada": "3",
          "Devta": "Brahma",
          "EnergyField": "Brahma",
          "PL": {
            "Planet": "Venus",
            "Occupancy": 5,
            "Ownership": [
              1,
              6
            ],
            "ScriptFull": "5 / 1, 6"
          },
          "NL": {
            "Planet": "Moon",
            "Occupancy": 7,
            "Ownership": [
              3
            ],
            "ScriptFull": "7 / 3"
          },
          "SL": {
            "Planet": "Mercury",
            "Occupancy": 5,
            "Ownership": [
              2,
              5
            ],
            "ScriptFull": "5 / 2, 5"
          },
          "NLSL": {
            "Planet": "Mars",
            "Occupancy": 4,
            "Ownership": [
              7,
              12
            ],
            "ScriptFull": "4 / 7, 12"
          },
          "PHScriptFull": "",
          "PHScript": [],
          "PHScriptExtra": []
        },
        {
          "RashiDetails": [
            {
              "RashiNumber": 3,
              "RashiRoman": "III",
              "Rashi": "Gemini",
              "RashiLord": "Mercury",
              "Degree": "14:32:42",
              "RashiDescAstro": "Pairs, Networking, Interlinked",
              "RashiDescVastu": "NNW"
            },
            {
              "RashiNumber": 4,
              "RashiRoman": "IV",
              "Rashi": "Cancer",
              "RashiLord": "Moon",
              "RashiDescAstro": "Intuitive, Care",
              "RashiDescVastu": "NNE",
              "Planets": [
                {
                  "Planet": "Uranus",
                  "PlanetDescAstro": "Unpredictable, Imaginative, Break Rules",
                  "PlanetDescVastu": "Innovative, Resourceful",
                  "Degree": "08:10:30",
                  "CumulativeDegreeDecimal": 98.1749422,
                  "IsRetro": false,
                  "IsExalted": false,
                  "IsDebilitated": false,
                  "IsCombust": false,
                  "IsUntenanted": false,
                  "IsSelfStar": false,
                  "RashiNumber": 4,
                  "Rashi": "Cancer",
                  "Nakshatra": "Pushya",
                  "NakshatraPada": "2",
                  "Devta": "Brihaspati",
                  "EnergyField": "Pushpadanta",
                  "PL": {
                    "Planet": "Uranus",
                    "Occupancy": 2,
                    "Ownership": [],
                    "ScriptFull": "2"
                  },
                  "NL": {
                    "Planet": "Saturn",
                    "Occupancy": 6,
                    "Ownership": [
                      9,
                      10
                    ],
                    "ScriptFull": "6 / 9, 10"
                  },
                  "SL": {
                    "Planet": "Venus",
                    "Occupancy": 5,
                    "Ownership": [
                      1,
                      6
                    ],
                    "ScriptFull": "5 / 1, 6"
                  },
                  "NLSL": {
                    "Planet": "Moon",
                    "Occupancy": 7,
                    "Ownership": [
                      3
                    ],
                    "ScriptFull": "7 / 3"
                  },
                  "PHScriptFull": "",
                  "PHScript": [],
                  "PHScriptExtra": [],
                  "PlanetAspectsZero": [],
                  "PlanetAspectsPositive": [],
                  "PlanetAspectsNegative": []
                }
              ]
            }
          ],
          "HouseAspectsZero": [],
          "HouseAspectsPositive": [],
          "HouseAspectsNegative": [],
          "House": "2",
          "HouseDescAstro": "Money, Family",
          "HouseDescVastu": "Money, Jewellery and Valuables",
          "Degree": "14:32:42",
          "CumulativeDegreeDecimal": 74.5449182,
          "RashiNumber": 3,
          "Rashi": "Gemini",
          "Nakshatra": "Ardra",
          "NakshatraPada": "3",
          "Devta": "Rudra",
          "EnergyField": "Rudra",
          "PL": {
            "Planet": "Mercury",
            "Occupancy": 5,
            "Ownership": [
              2,
              5
            ],
            "ScriptFull": "5 / 2, 5"
          },
          "NL": {
            "Planet": "Rahu",
            "Occupancy": 7,
            "Ownership": [
              7,
              12
            ],
            "ScriptFull": "7 / 7, 12"
          },
          "SL": {
            "Planet": "Ketu",
            "Occupancy": 1,
            "Ownership": [
              1,
              6
            ],
            "ScriptFull": "1 / 1, 6"
          },
          "NLSL": {
            "Planet": "Mars",
            "Occupancy": 4,
            "Ownership": [
              7,
              12
            ],
            "ScriptFull": "4 / 7, 12"
          },
          "PHScriptFull": "",
          "PHScript": [],
          "PHScriptExtra": []
        },
        {
          "RashiDetails": [
            {
              "RashiNumber": 4,
              "RashiRoman": "IV",
              "Rashi": "Cancer",
              "RashiLord": "Moon",
              "Degree": "09:13:49",
              "RashiDescAstro": "Intuitive, Care",
              "RashiDescVastu": "NNE",
              "Planets": [
                {
                  "Planet": "Jupiter",
                  "PlanetDescAstro": "Knowledge, Gravity",
                  "PlanetDescVastu": "Big, Knowledge Base",
                  "Degree": "28:31:32",
                  "CumulativeDegreeDecimal": 118.5255718,
                  "IsRetro": false,
                  "IsExalted": true,
                  "IsDebilitated": false,
                  "IsCombust": false,
                  "IsUntenanted": false,
                  "IsSelfStar": false,
                  "RashiNumber": 4,
                  "Rashi": "Cancer",
                  "Nakshatra": "Ashlesha",
                  "NakshatraPada": "4",
                  "Devta": "Nagas",
                  "EnergyField": "Bhujag",
                  "PL": {
                    "Planet": "Jupiter",
                    "Occupancy": 3,
                    "Ownership": [
                      8,
                      11
                    ],
                    "ScriptFull": "3 / 8, 11"
                  },
                  "NL": {
                    "Planet": "Mercury",
                    "Occupancy": 5,
                    "Ownership": [
                      2,
                      5
                    ],
                    "ScriptFull": "5 / 2, 5"
                  },
                  "SL": {
                    "Planet": "Saturn",
                    "Occupancy": 6,
                    "Ownership": [
                      9,
                      10
                    ],
                    "ScriptFull": "6 / 9, 10"
                  },
                  "NLSL": {
                    "Planet": "Jupiter",
                    "Occupancy": 3,
                    "Ownership": [
                      8,
                      11
                    ],
                    "ScriptFull": "3 / 8, 11"
                  },
                  "PHScriptFull": "(9,10)",
                  "PHScript": [],
                  "PHScriptExtra": [
                    9,
                    10
                  ],
                  "PlanetAspectsZero": [],
                  "PlanetAspectsPositive": [],
                  "PlanetAspectsNegative": []
                }
              ]
            },
            {
              "RashiNumber": 5,
              "RashiRoman": "V",
              "Rashi": "Leo",
              "RashiLord": "Sun",
              "RashiDescAstro": "Compliances, Reinstating Systems",
              "RashiDescVastu": "ENE",
              "Planets": [
                {
                  "Planet": "Pluto",
                  "PlanetDescAstro": "Intense Power, Life Altering, Renewal",
                  "PlanetDescVastu": "Underworld, Experience Power",
                  "Degree": "04:17:45",
                  "CumulativeDegreeDecimal": 124.2959473,
                  "IsRetro": false,
                  "IsExalted": false,
                  "IsDebilitated": false,
                  "IsCombust": false,
                  "IsUntenanted": false,
                  "IsSelfStar": false,
                  "RashiNumber": 5,
                  "Rashi": "Leo",
                  "Nakshatra": "Magha",
                  "NakshatraPada": "2",
                  "Devta": "Pitrs",
                  "EnergyField": "Pitra",
                  "PL": {
                    "Planet": "Pluto",
                    "Occupancy": 3,
                    "Ownership": [],
                    "ScriptFull": "3"
                  },
                  "NL": {
                    "Planet": "Ketu",
                    "Occupancy": 1,
                    "Ownership": [
                      1,
                      6
                    ],
                    "ScriptFull": "1 / 1, 6"
                  },
                  "SL": {
                    "Planet": "Moon",
                    "Occupancy": 7,
                    "Ownership": [
                      3
                    ],
                    "ScriptFull": "7 / 3"
                  },
                  "NLSL": {
                    "Planet": "Ketu",
                    "Occupancy": 1,
                    "Ownership": [
                      1,
                      6
                    ],
                    "ScriptFull": "1 / 1, 6"
                  },
                  "PHScriptFull": "",
                  "PHScript": [],
                  "PHScriptExtra": [],
                  "PlanetAspectsZero": [],
                  "PlanetAspectsPositive": [],
                  "PlanetAspectsNegative": []
                }
              ]
            }
          ],
          "HouseAspectsZero": [],
          "HouseAspectsPositive": [],
          "HouseAspectsNegative": [],
          "House": "3",
          "HouseDescAstro": "Performance, Presentation",
          "HouseDescVastu": "Effective Addressing, Courage",
          "Degree": "09:13:49",
          "CumulativeDegreeDecimal": 99.2302432,
          "RashiNumber": 4,
          "Rashi": "Cancer",
          "Nakshatra": "Pushya",
          "NakshatraPada": "2",
          "Devta": "Brihaspati",
          "EnergyField": "Pushpadanta",
          "PL": {
            "Planet": "Moon",
            "Occupancy": 7,
            "Ownership": [
              3
            ],
            "ScriptFull": "7 / 3"
          },
          "NL": {
            "Planet": "Saturn",
            "Occupancy": 6,
            "Ownership": [
              9,
              10
            ],
            "ScriptFull": "6 / 9, 10"
          },
          "SL": {
            "Planet": "Venus",
            "Occupancy": 5,
            "Ownership": [
              1,
              6
            ],
            "ScriptFull": "5 / 1, 6"
          },
          "NLSL": {
            "Planet": "Moon",
            "Occupancy": 7,
            "Ownership": [
              3
            ],
            "ScriptFull": "7 / 3"
          },
          "PHScriptFull": "",
          "PHScript": [],
          "PHScriptExtra": []
        },
        {
          "RashiDetails": [
            {
              "RashiNumber": 5,
              "RashiRoman": "V",
              "Rashi": "Leo",
              "RashiLord": "Sun",
              "Degree": "06:46:18",
              "RashiDescAstro": "Compliances, Reinstating Systems",
              "RashiDescVastu": "ENE",
              "Planets": [
                {
                  "Planet": "Mars",
                  "PlanetDescAstro": "Actions, Strength, Energy",
                  "PlanetDescVastu": "Fire, Heating, Tools, Weapons",
                  "Degree": "24:08:09",
                  "CumulativeDegreeDecimal": 144.1358004,
                  "IsRetro": false,
                  "IsExalted": false,
                  "IsDebilitated": false,
                  "IsCombust": false,
                  "IsUntenanted": false,
                  "IsSelfStar": false,
                  "RashiNumber": 5,
                  "Rashi": "Leo",
                  "Nakshatra": "P. Phalguni",
                  "NakshatraPada": "4",
                  "Devta": "Bhaga",
                  "EnergyField": "Savita",
                  "PL": {
                    "Planet": "Mars",
                    "Occupancy": 4,
                    "Ownership": [
                      7,
                      12
                    ],
                    "ScriptFull": "4 / 7, 12"
                  },
                  "NL": {
                    "Planet": "Venus",
                    "Occupancy": 5,
                    "Ownership": [
                      1,
                      6
                    ],
                    "ScriptFull": "5 / 1, 6"
                  },
                  "SL": {
                    "Planet": "Mercury",
                    "Occupancy": 5,
                    "Ownership": [
                      2,
                      5
                    ],
                    "ScriptFull": "5 / 2, 5"
                  },
                  "NLSL": {
                    "Planet": "Mars",
                    "Occupancy": 4,
                    "Ownership": [
                      7,
                      12
                    ],
                    "ScriptFull": "4 / 7, 12"
                  },
                  "PHScriptFull": "",
                  "PHScript": [],
                  "PHScriptExtra": [],
                  "PlanetAspectsZero": [],
                  "PlanetAspectsPositive": [
                    {
                      "Aspect": 30,
                      "IsWithRaKe": false,
                      "Planet": "Jupiter",
                      "PlanetRashi": "Cancer",
                      "PlanetRashiShort": "Can",
                      "ScriptFull": "3 / 8, 11"
                    }
                  ],
                  "PlanetAspectsNegative": [
                    {
                      "Aspect": 90,
                      "IsWithRaKe": false,
                      "Planet": "Ketu",
                      "PlanetRashi": "Taurus",
                      "PlanetRashiShort": "Tau",
                      "ScriptFull": "1 / 1, 6"
                    }
                  ]
                }
              ]
            },
            {
              "RashiNumber": 6,
              "RashiRoman": "VI",
              "Rashi": "Virgo",
              "RashiLord": "Mercury",
              "RashiDescAstro": "Organising, Decorating, Packaging",
              "RashiDescVastu": "North",
              "Planets": [
                {
                  "Planet": "Sun",
                  "PlanetDescAstro": "Authority, Authenticity",
                  "PlanetDescVastu": "MCB, Genset, Authority Docs",
                  "Degree": "06:39:15",
                  "CumulativeDegreeDecimal": 156.6540380,
                  "IsRetro": false,
                  "IsExalted": false,
                  "IsDebilitated": false,
                  "IsCombust": false,
                  "IsUntenanted": true,
                  "IsSelfStar": true,
                  "RashiNumber": 6,
                  "Rashi": "Virgo",
                  "Nakshatra": "U. Phalguni",
                  "NakshatraPada": "3",
                  "Devta": "Aryaman",
                  "EnergyField": "Aryama",
                  "PL": {
                    "Planet": "Sun",
                    "Occupancy": 4,
                    "Ownership": [
                      4
                    ],
                    "ScriptFull": "4 / 4"
                  },
                  "NL": {
                    "Planet": "Sun",
                    "Occupancy": 4,
                    "Ownership": [
                      4
                    ],
                    "ScriptFull": "4 / 4"
                  },
                  "SL": {
                    "Planet": "Mercury",
                    "Occupancy": 5,
                    "Ownership": [
                      2,
                      5
                    ],
                    "ScriptFull": "5 / 2, 5"
                  },
                  "NLSL": {
                    "Planet": "Mars",
                    "Occupancy": 4,
                    "Ownership": [
                      7,
                      12
                    ],
                    "ScriptFull": "4 / 7, 12"
                  },
                  "PHScriptFull": "",
                  "PHScript": [],
                  "PHScriptExtra": [],
                  "PlanetAspectsZero": [],
                  "PlanetAspectsPositive": [],
                  "PlanetAspectsNegative": []
                }
              ]
            }
          ],
          "HouseAspectsZero": [],
          "HouseAspectsPositive": [],
          "HouseAspectsNegative": [],
          "House": "4",
          "HouseDescAstro": "Essential Learnings, Land, Building",
          "HouseDescVastu": "Building Front and Facing",
          "Degree": "06:46:18",
          "CumulativeDegreeDecimal": 126.7715969,
          "RashiNumber": 5,
          "Rashi": "Leo",
          "Nakshatra": "Magha",
          "NakshatraPada": "3",
          "Devta": "Pitrs",
          "EnergyField": "Pitra",
          "PL": {
            "Planet": "Sun",
            "Occupancy": 4,
            "Ownership": [
              4
            ],
            "ScriptFull": "4 / 4"
          },
          "NL": {
            "Planet": "Ketu",
            "Occupancy": 1,
            "Ownership": [
              1,
              6
            ],
            "ScriptFull": "1 / 1, 6"
          },
          "SL": {
            "Planet": "Rahu",
            "Occupancy": 7,
            "Ownership": [
              7,
              12
            ],
            "ScriptFull": "7 / 7, 12"
          },
          "NLSL": {
            "Planet": "Mercury",
            "Occupancy": 5,
            "Ownership": [
              2,
              5
            ],
            "ScriptFull": "5 / 2, 5"
          },
          "PHScriptFull": "(12)",
          "PHScript": [],
          "PHScriptExtra": [
            12
          ]
        },
        {
          "RashiDetails": [
            {
              "RashiNumber": 6,
              "RashiRoman": "VI",
              "Rashi": "Virgo",
              "RashiLord": "Mercury",
              "Degree": "09:11:12",
              "RashiDescAstro": "Organising, Decorating, Packaging",
              "RashiDescVastu": "North",
              "Planets": [
                {
                  "Planet": "Venus",
                  "PlanetDescAstro": "Beauty, Detailing",
                  "PlanetDescVastu": "Comforting, Designer Objects",
                  "Degree": "12:41:42",
                  "CumulativeDegreeDecimal": 162.6949177,
                  "IsRetro": false,
                  "IsExalted": false,
                  "IsDebilitated": true,
                  "IsCombust": false,
                  "IsUntenanted": false,
                  "IsSelfStar": false,
                  "RashiNumber": 6,
                  "Rashi": "Virgo",
                  "Nakshatra": "Hasta",
                  "NakshatraPada": "1",
                  "Devta": "Surya",
                  "EnergyField": "Savitra",
                  "PL": {
                    "Planet": "Venus",
                    "Occupancy": 5,
                    "Ownership": [
                      1,
                      6
                    ],
                    "ScriptFull": "5 / 1, 6"
                  },
                  "NL": {
                    "Planet": "Moon",
                    "Occupancy": 7,
                    "Ownership": [
                      3
                    ],
                    "ScriptFull": "7 / 3"
                  },
                  "SL": {
                    "Planet": "Rahu",
                    "Occupancy": 7,
                    "Ownership": [
                      7,
                      12
                    ],
                    "ScriptFull": "7 / 7, 12"
                  },
                  "NLSL": {
                    "Planet": "Mercury",
                    "Occupancy": 5,
                    "Ownership": [
                      2,
                      5
                    ],
                    "ScriptFull": "5 / 2, 5"
                  },
                  "PHScriptFull": "(12)",
                  "PHScript": [],
                  "PHScriptExtra": [
                    12
                  ],
                  "PlanetAspectsZero": [],
                  "PlanetAspectsPositive": [],
                  "PlanetAspectsNegative": [
                    {
                      "Aspect": 45,
                      "IsWithRaKe": false,
                      "Planet": "Jupiter",
                      "PlanetRashi": "Cancer",
                      "PlanetRashiShort": "Can",
                      "ScriptFull": "3 / 8, 11"
                    }
                  ]
                }
              ]
            },
            {
              "RashiNumber": 7,
              "RashiRoman": "VII",
              "Rashi": "Libra",
              "RashiLord": "Venus",
              "RashiDescAstro": "Balance, Weighing, Worthiness",
              "RashiDescVastu": "WSW",
              "Planets": [
                {
                  "Planet": "Mercury",
                  "PlanetDescAstro": "Communication, Intelligence",
                  "PlanetDescVastu": "Books, Music",
                  "Degree": "02:23:04",
                  "CumulativeDegreeDecimal": 182.3844729,
                  "IsRetro": false,
                  "IsExalted": false,
                  "IsDebilitated": false,
                  "IsCombust": false,
                  "IsUntenanted": false,
                  "IsSelfStar": false,
                  "RashiNumber": 7,
                  "Rashi": "Libra",
                  "Nakshatra": "Chitra",
                  "NakshatraPada": "3",
                  "Devta": "Tvastar",
                  "EnergyField": "Mukhya",
                  "PL": {
                    "Planet": "Mercury",
                    "Occupancy": 5,
                    "Ownership": [
                      2,
                      5
                    ],
                    "ScriptFull": "5 / 2, 5"
                  },
                  "NL": {
                    "Planet": "Mars",
                    "Occupancy": 4,
                    "Ownership": [
                      7,
                      12
                    ],
                    "ScriptFull": "4 / 7, 12"
                  },
                  "SL": {
                    "Planet": "Ketu",
                    "Occupancy": 1,
                    "Ownership": [
                      1,
                      6
                    ],
                    "ScriptFull": "1 / 1, 6"
                  },
                  "NLSL": {
                    "Planet": "Mars",
                    "Occupancy": 4,
                    "Ownership": [
                      7,
                      12
                    ],
                    "ScriptFull": "4 / 7, 12"
                  },
                  "PHScriptFull": "",
                  "PHScript": [],
                  "PHScriptExtra": [],
                  "PlanetAspectsZero": [],
                  "PlanetAspectsPositive": [
                    {
                      "Aspect": 30,
                      "IsWithRaKe": false,
                      "Planet": "Sun",
                      "PlanetRashi": "Virgo",
                      "PlanetRashiShort": "Vir",
                      "ScriptFull": "4 / 4"
                    },
                    {
                      "Aspect": 60,
                      "IsWithRaKe": false,
                      "Planet": "Jupiter",
                      "PlanetRashi": "Cancer",
                      "PlanetRashiShort": "Can",
                      "ScriptFull": "3 / 8, 11"
                    },
                    {
                      "Aspect": 120,
                      "IsWithRaKe": false,
                      "Planet": "Ketu",
                      "PlanetRashi": "Taurus",
                      "PlanetRashiShort": "Tau",
                      "ScriptFull": "1 / 1, 6"
                    }
                  ],
                  "PlanetAspectsNegative": []
                },
                {
                  "Planet": "Neptune",
                  "PlanetDescAstro": "Psychic, Intuition, Spirituality, Dreams",
                  "PlanetDescVastu": "Spirituality, Universal Truths, Artistry",
                  "Degree": "03:42:14",
                  "CumulativeDegreeDecimal": 183.7040224,
                  "IsRetro": false,
                  "IsExalted": false,
                  "IsDebilitated": false,
                  "IsCombust": false,
                  "IsUntenanted": false,
                  "IsSelfStar": false,
                  "RashiNumber": 7,
                  "Rashi": "Libra",
                  "Nakshatra": "Chitra",
                  "NakshatraPada": "4",
                  "Devta": "Tvastar",
                  "EnergyField": "Mukhya",
                  "PL": {
                    "Planet": "Neptune",
                    "Occupancy": 5,
                    "Ownership": [],
                    "ScriptFull": "5"
                  },
                  "NL": {
                    "Planet": "Mars",
                    "Occupancy": 4,
                    "Ownership": [
                      7,
                      12
                    ],
                    "ScriptFull": "4 / 7, 12"
                  },
                  "SL": {
                    "Planet": "Venus",
                    "Occupancy": 5,
                    "Ownership": [
                      1,
                      6
                    ],
                    "ScriptFull": "5 / 1, 6"
                  },
                  "NLSL": {
                    "Planet": "Moon",
                    "Occupancy": 7,
                    "Ownership": [
                      3
                    ],
                    "ScriptFull": "7 / 3"
                  },
                  "PHScriptFull": "",
                  "PHScript": [],
                  "PHScriptExtra": [],
                  "PlanetAspectsZero": [
                    {
                      "Aspect": 0,
                      "IsWithRaKe": false,
                      "Planet": "Mercury",
                      "PlanetRashi": "Libra",
                      "PlanetRashiShort": "Lib",
                      "ScriptFull": "5 / 2, 5"
                    }
                  ],
                  "PlanetAspectsPositive": [
                    {
                      "Aspect": 30,
                      "IsWithRaKe": false,
                      "Planet": "Sun",
                      "PlanetRashi": "Virgo",
                      "PlanetRashiShort": "Vir",
                      "ScriptFull": "4 / 4"
                    }
                  ],
                  "PlanetAspectsNegative": []
                }
              ]
            }
          ],
          "HouseAspectsZero": [
            {
              "Aspect": 0,
              "IsWithRaKe": false,
              "Planet": "Venus",
              "PlanetRashi": "Virgo",
              "PlanetRashiShort": "Vir",
              "ScriptFull": "5 / 1, 6"
            },
            {
              "Aspect": 0,
              "IsWithRaKe": false,
              "Planet": "Sun",
              "PlanetRashi": "Virgo",
              "PlanetRashiShort": "Vir",
              "ScriptFull": "4 / 4"
            }
          ],
          "HouseAspectsPositive": [],
          "HouseAspectsNegative": [
            {
              "Aspect": 45,
              "IsWithRaKe": false,
              "Planet": "Jupiter",
              "PlanetRashi": "Cancer",
              "PlanetRashiShort": "Can",
              "ScriptFull": "3 / 8, 11"
            }
          ],
          "House": "5",
          "HouseDescAstro": "Blissful, Hobbies, Solution",
          "HouseDescVastu": "Solution Providing, Life Learning",
          "Degree": "09:11:12",
          "CumulativeDegreeDecimal": 159.1865486,
          "RashiNumber": 6,
          "Rashi": "Virgo",
          "Nakshatra": "U. Phalguni",
          "NakshatraPada": "4",
          "Devta": "Aryaman",
          "EnergyField": "Aryama",
          "PL": {
            "Planet": "Mercury",
            "Occupancy": 5,
            "Ownership": [
              2,
              5
            ],
            "ScriptFull": "5 / 2, 5"
          },
          "NL": {
            "Planet": "Sun",
            "Occupancy": 4,
            "Ownership": [
              4
            ],
            "ScriptFull": "4 / 4"
          },
          "SL": {
            "Planet": "Venus",
            "Occupancy": 5,
            "Ownership": [
              1,
              6
            ],
            "ScriptFull": "5 / 1, 6"
          },
          "NLSL": {
            "Planet": "Moon",
            "Occupancy": 7,
            "Ownership": [
              3
            ],
            "ScriptFull": "7 / 3"
          },
          "PHScriptFull": "",
          "PHScript": [],
          "PHScriptExtra": []
        },
        {
          "RashiDetails": [
            {
              "RashiNumber": 7,
              "RashiRoman": "VII",
              "Rashi": "Libra",
              "RashiLord": "Venus",
              "Degree": "14:59:59",
              "RashiDescAstro": "Balance, Weighing, Worthiness",
              "RashiDescVastu": "WSW",
              "Planets": [
                {
                  "Planet": "Saturn",
                  "PlanetDescAstro": "Expertise, Skill, Focus",
                  "PlanetDescVastu": "Storage, Antique, Old",
                  "Degree": "24:34:49",
                  "CumulativeDegreeDecimal": 204.5803654,
                  "IsRetro": false,
                  "IsExalted": true,
                  "IsDebilitated": false,
                  "IsCombust": false,
                  "IsUntenanted": true,
                  "IsSelfStar": false,
                  "RashiNumber": 7,
                  "Rashi": "Libra",
                  "Nakshatra": "Vishakha",
                  "NakshatraPada": "2",
                  "Devta": "Indra Agni",
                  "EnergyField": "Mahendra",
                  "PL": {
                    "Planet": "Saturn",
                    "Occupancy": 6,
                    "Ownership": [
                      9,
                      10
                    ],
                    "ScriptFull": "6 / 9, 10"
                  },
                  "NL": {
                    "Planet": "Jupiter",
                    "Occupancy": 3,
                    "Ownership": [
                      8,
                      11
                    ],
                    "ScriptFull": "3 / 8, 11"
                  },
                  "SL": {
                    "Planet": "Mercury",
                    "Occupancy": 5,
                    "Ownership": [
                      2,
                      5
                    ],
                    "ScriptFull": "5 / 2, 5"
                  },
                  "NLSL": {
                    "Planet": "Mars",
                    "Occupancy": 4,
                    "Ownership": [
                      7,
                      12
                    ],
                    "ScriptFull": "4 / 7, 12"
                  },
                  "PHScriptFull": "9,10",
                  "PHScript": [
                    9,
                    10
                  ],
                  "PHScriptExtra": [],
                  "PlanetAspectsZero": [],
                  "PlanetAspectsPositive": [
                    {
                      "Aspect": 60,
                      "IsWithRaKe": false,
                      "Planet": "Mars",
                      "PlanetRashi": "Leo",
                      "PlanetRashiShort": "Leo",
                      "ScriptFull": "4 / 7, 12"
                    }
                  ],
                  "PlanetAspectsNegative": [
                    {
                      "Aspect": 45,
                      "IsWithRaKe": false,
                      "Planet": "Venus",
                      "PlanetRashi": "Virgo",
                      "PlanetRashiShort": "Vir",
                      "ScriptFull": "5 / 1, 6"
                    },
                    {
                      "Aspect": 45,
                      "IsWithRaKe": false,
                      "Planet": "Sun",
                      "PlanetRashi": "Virgo",
                      "PlanetRashiShort": "Vir",
                      "ScriptFull": "4 / 4"
                    },
                    {
                      "Aspect": 90,
                      "IsWithRaKe": false,
                      "Planet": "Jupiter",
                      "PlanetRashi": "Cancer",
                      "PlanetRashiShort": "Can",
                      "ScriptFull": "3 / 8, 11"
                    }
                  ]
                }
              ]
            }
          ],
          "HouseAspectsZero": [],
          "HouseAspectsPositive": [
            {
              "Aspect": 30,
              "IsWithRaKe": false,
              "Planet": "Venus",
              "PlanetRashi": "Virgo",
              "PlanetRashiShort": "Vir",
              "ScriptFull": "5 / 1, 6"
            }
          ],
          "HouseAspectsNegative": [],
          "House": "6",
          "HouseDescAstro": "Service, Deliverable",
          "HouseDescVastu": "Serving Area",
          "Degree": "14:59:59",
          "CumulativeDegreeDecimal": 194.9997505,
          "RashiNumber": 7,
          "Rashi": "Libra",
          "Nakshatra": "Swati",
          "NakshatraPada": "3",
          "Devta": "Vayu",
          "EnergyField": "Roga",
          "PL": {
            "Planet": "Venus",
            "Occupancy": 5,
            "Ownership": [
              1,
              6
            ],
            "ScriptFull": "5 / 1, 6"
          },
          "NL": {
            "Planet": "Rahu",
            "Occupancy": 7,
            "Ownership": [
              7,
              12
            ],
            "ScriptFull": "7 / 7, 12"
          },
          "SL": {
            "Planet": "Ketu",
            "Occupancy": 1,
            "Ownership": [
              1,
              6
            ],
            "ScriptFull": "1 / 1, 6"
          },
          "NLSL": {
            "Planet": "Mars",
            "Occupancy": 4,
            "Ownership": [
              7,
              12
            ],
            "ScriptFull": "4 / 7, 12"
          },
          "PHScriptFull": "",
          "PHScript": [],
          "PHScriptExtra": []
        },
        {
          "RashiDetails": [
            {
              "RashiNumber": 8,
              "RashiRoman": "VIII",
              "Rashi": "Scorpio",
              "RashiLord": "Mars",
              "Degree": "19:27:51",
              "RashiDescAstro": "Layout, Planning",
              "RashiDescVastu": "SW, S7",
              "Planets": [
                {
                  "Planet": "Rahu",
                  "PlanetDescAstro": "Attention, Leading",
                  "PlanetDescVastu": "TV, Clock, Name Plate",
                  "Degree": "27:46:05",
                  "CumulativeDegreeDecimal": 237.7680118,
                  "IsRetro": false,
                  "IsExalted": false,
                  "IsDebilitated": false,
                  "IsCombust": false,
                  "IsUntenanted": true,
                  "IsSelfStar": false,
                  "RashiNumber": 8,
                  "Rashi": "Scorpio",
                  "Nakshatra": "Jyeshtha",
                  "NakshatraPada": "4",
                  "Devta": "Indra",
                  "EnergyField": "Indra",
                  "PL": {
                    "Planet": "Rahu",
                    "Occupancy": 7,
                    "Ownership": [
                      7,
                      12
                    ],
                    "ScriptFull": "7 / 7, 12"
                  },
                  "NL": {
                    "Planet": "Mercury",
                    "Occupancy": 5,
                    "Ownership": [
                      2,
                      5
                    ],
                    "ScriptFull": "5 / 2, 5"
                  },
                  "SL": {
                    "Planet": "Jupiter",
                    "Occupancy": 3,
                    "Ownership": [
                      8,
                      11
                    ],
                    "ScriptFull": "3 / 8, 11"
                  },
                  "NLSL": {
                    "Planet": "Mercury",
                    "Occupancy": 5,
                    "Ownership": [
                      2,
                      5
                    ],
                    "ScriptFull": "5 / 2, 5"
                  },
                  "PHScriptFull": "12",
                  "PHScript": [
                    12
                  ],
                  "PHScriptExtra": [],
                  "PlanetAspectsZero": [
                    {
                      "Aspect": 0,
                      "IsWithRaKe": false,
                      "Planet": "Moon",
                      "PlanetRashi": "Sagittarius",
                      "PlanetRashiShort": "Sag",
                      "ScriptFull": "7 / 3"
                    }
                  ],
                  "PlanetAspectsPositive": [
                    {
                      "Aspect": 30,
                      "IsWithRaKe": false,
                      "Planet": "Saturn",
                      "PlanetRashi": "Libra",
                      "PlanetRashiShort": "Lib",
                      "ScriptFull": "6 / 9, 10"
                    },
                    {
                      "Aspect": 60,
                      "IsWithRaKe": false,
                      "Planet": "Mercury",
                      "PlanetRashi": "Libra",
                      "PlanetRashiShort": "Lib",
                      "ScriptFull": "5 / 2, 5"
                    },
                    {
                      "Aspect": 120,
                      "IsWithRaKe": false,
                      "Planet": "Jupiter",
                      "PlanetRashi": "Cancer",
                      "PlanetRashiShort": "Can",
                      "ScriptFull": "3 / 8, 11"
                    }
                  ],
                  "PlanetAspectsNegative": [
                    {
                      "Aspect": 90,
                      "IsWithRaKe": false,
                      "Planet": "Mars",
                      "PlanetRashi": "Leo",
                      "PlanetRashiShort": "Leo",
                      "ScriptFull": "4 / 7, 12"
                    }
                  ]
                }
              ]
            },
            {
              "RashiNumber": 9,
              "RashiRoman": "IX",
              "Rashi": "Sagittarius",
              "RashiLord": "Jupiter",
              "RashiDescAstro": "What To Do, Setting Goals, Motivating",
              "RashiDescVastu": "NE",
              "Planets": [
                {
                  "Planet": "Moon",
                  "PlanetDescAstro": "Inner Mind, Subconscious",
                  "PlanetDescVastu": "Water, Linens, Daily Care Stuff",
                  "Degree": "01:54:52",
                  "CumulativeDegreeDecimal": 241.9143521,
                  "IsRetro": false,
                  "IsExalted": false,
                  "IsDebilitated": false,
                  "IsCombust": false,
                  "IsUntenanted": false,
                  "IsSelfStar": false,
                  "RashiNumber": 9,
                  "Rashi": "Sagittarius",
                  "Nakshatra": "Mula",
                  "NakshatraPada": "1",
                  "Devta": "Nirriti",
                  "EnergyField": "Dauwarik",
                  "PL": {
                    "Planet": "Moon",
                    "Occupancy": 7,
                    "Ownership": [
                      3
                    ],
                    "ScriptFull": "7 / 3"
                  },
                  "NL": {
                    "Planet": "Ketu",
                    "Occupancy": 1,
                    "Ownership": [
                      1,
                      6
                    ],
                    "ScriptFull": "1 / 1, 6"
                  },
                  "SL": {
                    "Planet": "Venus",
                    "Occupancy": 5,
                    "Ownership": [
                      1,
                      6
                    ],
                    "ScriptFull": "5 / 1, 6"
                  },
                  "NLSL": {
                    "Planet": "Moon",
                    "Occupancy": 7,
                    "Ownership": [
                      3
                    ],
                    "ScriptFull": "7 / 3"
                  },
                  "PHScriptFull": "",
                  "PHScript": [],
                  "PHScriptExtra": [],
                  "PlanetAspectsZero": [
                    {
                      "Aspect": 0,
                      "IsWithRaKe": false,
                      "Planet": "Rahu",
                      "PlanetRashi": "Scorpio",
                      "PlanetRashiShort": "Sco",
                      "ScriptFull": "7 / 7, 12"
                    }
                  ],
                  "PlanetAspectsPositive": [
                    {
                      "Aspect": 60,
                      "IsWithRaKe": false,
                      "Planet": "Mercury",
                      "PlanetRashi": "Libra",
                      "PlanetRashiShort": "Lib",
                      "ScriptFull": "5 / 2, 5"
                    },
                    {
                      "Aspect": 120,
                      "IsWithRaKe": false,
                      "Planet": "Jupiter",
                      "PlanetRashi": "Cancer",
                      "PlanetRashiShort": "Can",
                      "ScriptFull": "3 / 8, 11"
                    }
                  ],
                  "PlanetAspectsNegative": [
                    {
                      "Aspect": 90,
                      "IsWithRaKe": false,
                      "Planet": "Sun",
                      "PlanetRashi": "Virgo",
                      "PlanetRashiShort": "Vir",
                      "ScriptFull": "4 / 4"
                    }
                  ]
                }
              ]
            }
          ],
          "HouseAspectsZero": [],
          "HouseAspectsPositive": [],
          "HouseAspectsNegative": [
            {
              "Aspect": 45,
              "IsWithRaKe": false,
              "Planet": "Mercury",
              "PlanetRashi": "Libra",
              "PlanetRashiShort": "Lib",
              "ScriptFull": "5 / 2, 5"
            },
            {
              "Aspect": 90,
              "IsWithRaKe": false,
              "Planet": "Mars",
              "PlanetRashi": "Leo",
              "PlanetRashiShort": "Leo",
              "ScriptFull": "4 / 7, 12"
            }
          ],
          "House": "7",
          "HouseDescAstro": "Interaction, Public",
          "HouseDescVastu": "Assisting",
          "Degree": "19:27:51",
          "CumulativeDegreeDecimal": 229.4640760,
          "RashiNumber": 8,
          "Rashi": "Scorpio",
          "Nakshatra": "Jyeshtha",
          "NakshatraPada": "1",
          "Devta": "Indra",
          "EnergyField": "Indra",
          "PL": {
            "Planet": "Mars",
            "Occupancy": 4,
            "Ownership": [
              7,
              12
            ],
            "ScriptFull": "4 / 7, 12"
          },
          "NL": {
            "Planet": "Mercury",
            "Occupancy": 5,
            "Ownership": [
              2,
              5
            ],
            "ScriptFull": "5 / 2, 5"
          },
          "SL": {
            "Planet": "Venus",
            "Occupancy": 5,
            "Ownership": [
              1,
              6
            ],
            "ScriptFull": "5 / 1, 6"
          },
          "NLSL": {
            "Planet": "Moon",
            "Occupancy": 7,
            "Ownership": [
              3
            ],
            "ScriptFull": "7 / 3"
          },
          "PHScriptFull": "",
          "PHScript": [],
          "PHScriptExtra": []
        },
        {
          "RashiDetails": [
            {
              "RashiNumber": 9,
              "RashiRoman": "IX",
              "Rashi": "Sagittarius",
              "RashiLord": "Jupiter",
              "Degree": "14:32:42",
              "RashiDescAstro": "What To Do, Setting Goals, Motivating",
              "RashiDescVastu": "NE"
            }
          ],
          "HouseAspectsZero": [],
          "HouseAspectsPositive": [],
          "HouseAspectsNegative": [
            {
              "Aspect": 45,
              "IsWithRaKe": false,
              "Planet": "Saturn",
              "PlanetRashi": "Libra",
              "PlanetRashiShort": "Lib",
              "ScriptFull": "6 / 9, 10"
            },
            {
              "Aspect": 90,
              "IsWithRaKe": false,
              "Planet": "Venus",
              "PlanetRashi": "Virgo",
              "PlanetRashiShort": "Vir",
              "ScriptFull": "5 / 1, 6"
            },
            {
              "Aspect": 135,
              "IsWithRaKe": false,
              "Planet": "Jupiter",
              "PlanetRashi": "Cancer",
              "PlanetRashiShort": "Can",
              "ScriptFull": "3 / 8, 11"
            }
          ],
          "House": "8",
          "HouseDescAstro": "Problems, Pain, Behind Scenes",
          "HouseDescVastu": "Maintenance, Behind Curtains",
          "Degree": "14:32:42",
          "CumulativeDegreeDecimal": 254.5449182,
          "RashiNumber": 9,
          "Rashi": "Sagittarius",
          "Nakshatra": "P. Ashadha",
          "NakshatraPada": "1",
          "Devta": "Apah",
          "EnergyField": "Apah",
          "PL": {
            "Planet": "Jupiter",
            "Occupancy": 3,
            "Ownership": [
              8,
              11
            ],
            "ScriptFull": "3 / 8, 11"
          },
          "NL": {
            "Planet": "Venus",
            "Occupancy": 5,
            "Ownership": [
              1,
              6
            ],
            "ScriptFull": "5 / 1, 6"
          },
          "SL": {
            "Planet": "Venus",
            "Occupancy": 5,
            "Ownership": [
              1,
              6
            ],
            "ScriptFull": "5 / 1, 6"
          },
          "NLSL": {
            "Planet": "Moon",
            "Occupancy": 7,
            "Ownership": [
              3
            ],
            "ScriptFull": "7 / 3"
          },
          "PHScriptFull": "",
          "PHScript": [],
          "PHScriptExtra": []
        },
        {
          "RashiDetails": [
            {
              "RashiNumber": 10,
              "RashiRoman": "X",
              "Rashi": "Capricorn",
              "RashiLord": "Saturn",
              "Degree": "09:13:49",
              "RashiDescAstro": "Strategy, Structuring",
              "RashiDescVastu": "South, S3, S6"
            }
          ],
          "HouseAspectsZero": [],
          "HouseAspectsPositive": [
            {
              "Aspect": 120,
              "IsWithRaKe": false,
              "Planet": "Venus",
              "PlanetRashi": "Virgo",
              "PlanetRashiShort": "Vir",
              "ScriptFull": "5 / 1, 6"
            },
            {
              "Aspect": 120,
              "IsWithRaKe": false,
              "Planet": "Sun",
              "PlanetRashi": "Virgo",
              "PlanetRashiShort": "Vir",
              "ScriptFull": "4 / 4"
            }
          ],
          "HouseAspectsNegative": [
            {
              "Aspect": 135,
              "IsWithRaKe": false,
              "Planet": "Mars",
              "PlanetRashi": "Leo",
              "PlanetRashiShort": "Leo",
              "ScriptFull": "4 / 7, 12"
            }
          ],
          "House": "9",
          "HouseDescAstro": "Fortune, Dharma, Moral Duties",
          "HouseDescVastu": "Meditation, Higher Learnings",
          "Degree": "09:13:49",
          "CumulativeDegreeDecimal": 279.2302432,
          "RashiNumber": 10,
          "Rashi": "Capricorn",
          "Nakshatra": "U. Ashadha",
          "NakshatraPada": "4",
          "Devta": "Visvedevas",
          "EnergyField": "Bhudhar",
          "PL": {
            "Planet": "Saturn",
            "Occupancy": 6,
            "Ownership": [
              9,
              10
            ],
            "ScriptFull": "6 / 9, 10"
          },
          "NL": {
            "Planet": "Sun",
            "Occupancy": 4,
            "Ownership": [
              4
            ],
            "ScriptFull": "4 / 4"
          },
          "SL": {
            "Planet": "Venus",
            "Occupancy": 5,
            "Ownership": [
              1,
              6
            ],
            "ScriptFull": "5 / 1, 6"
          },
          "NLSL": {
            "Planet": "Moon",
            "Occupancy": 7,
            "Ownership": [
              3
            ],
            "ScriptFull": "7 / 3"
          },
          "PHScriptFull": "9,10",
          "PHScript": [
            9,
            10
          ],
          "PHScriptExtra": []
        },
        {
          "RashiDetails": [
            {
              "RashiNumber": 11,
              "RashiRoman": "XI",
              "Rashi": "Aquarius",
              "RashiLord": "Saturn",
              "Degree": "06:46:18",
              "RashiDescAstro": "Social Welfare, Help, Humanity",
              "RashiDescVastu": "West, W6"
            }
          ],
          "HouseAspectsZero": [],
          "HouseAspectsPositive": [
            {
              "Aspect": 60,
              "IsWithRaKe": true,
              "Planet": "Moon",
              "PlanetRashi": "Sagittarius",
              "PlanetRashiShort": "Sag",
              "ScriptFull": "7 / 3"
            },
            {
              "Aspect": 120,
              "IsWithRaKe": false,
              "Planet": "Mercury",
              "PlanetRashi": "Libra",
              "PlanetRashiShort": "Lib",
              "ScriptFull": "5 / 2, 5"
            },
            {
              "Aspect": 150,
              "IsWithRaKe": false,
              "Planet": "Sun",
              "PlanetRashi": "Virgo",
              "PlanetRashiShort": "Vir",
              "ScriptFull": "4 / 4"
            }
          ],
          "HouseAspectsNegative": [],
          "House": "10",
          "HouseDescAstro": "Top Position, Growth ",
          "HouseDescVastu": "Excel and Growth",
          "Degree": "06:46:18",
          "CumulativeDegreeDecimal": 306.7715969,
          "RashiNumber": 11,
          "Rashi": "Aquarius",
          "Nakshatra": "Shatabhisha",
          "NakshatraPada": "1",
          "Devta": "Varuna",
          "EnergyField": "Varun",
          "PL": {
            "Planet": "Saturn",
            "Occupancy": 6,
            "Ownership": [
              9,
              10
            ],
            "ScriptFull": "6 / 9, 10"
          },
          "NL": {
            "Planet": "Rahu",
            "Occupancy": 7,
            "Ownership": [
              7,
              12
            ],
            "ScriptFull": "7 / 7, 12"
          },
          "SL": {
            "Planet": "Rahu",
            "Occupancy": 7,
            "Ownership": [
              7,
              12
            ],
            "ScriptFull": "7 / 7, 12"
          },
          "NLSL": {
            "Planet": "Mercury",
            "Occupancy": 5,
            "Ownership": [
              2,
              5
            ],
            "ScriptFull": "5 / 2, 5"
          },
          "PHScriptFull": "9,10 (12)",
          "PHScript": [
            9,
            10
          ],
          "PHScriptExtra": [
            12
          ]
        },
        {
          "RashiDetails": [
            {
              "RashiNumber": 12,
              "RashiRoman": "XII",
              "Rashi": "Pisces",
              "RashiLord": "Jupiter",
              "Degree": "09:11:12",
              "RashiDescAstro": "Meaningful Research",
              "RashiDescVastu": "SE, E7, S2"
            }
          ],
          "HouseAspectsZero": [],
          "HouseAspectsPositive": [],
          "HouseAspectsNegative": [
            {
              "Aspect": 135,
              "IsWithRaKe": false,
              "Planet": "Saturn",
              "PlanetRashi": "Libra",
              "PlanetRashiShort": "Lib",
              "ScriptFull": "6 / 9, 10"
            },
            {
              "Aspect": 180,
              "IsWithRaKe": false,
              "Planet": "Venus",
              "PlanetRashi": "Virgo",
              "PlanetRashiShort": "Vir",
              "ScriptFull": "5 / 1, 6"
            },
            {
              "Aspect": 180,
              "IsWithRaKe": false,
              "Planet": "Sun",
              "PlanetRashi": "Virgo",
              "PlanetRashiShort": "Vir",
              "ScriptFull": "4 / 4"
            }
          ],
          "House": "11",
          "HouseDescAstro": "Achievements, Benefits, Wish",
          "HouseDescVastu": "Friends and Party",
          "Degree": "09:11:12",
          "CumulativeDegreeDecimal": 339.1865486,
          "RashiNumber": 12,
          "Rashi": "Pisces",
          "Nakshatra": "U. Bhadrapada",
          "NakshatraPada": "2",
          "Devta": "Ahirbudhnya",
          "EnergyField": "Ahir",
          "PL": {
            "Planet": "Jupiter",
            "Occupancy": 3,
            "Ownership": [
              8,
              11
            ],
            "ScriptFull": "3 / 8, 11"
          },
          "NL": {
            "Planet": "Saturn",
            "Occupancy": 6,
            "Ownership": [
              9,
              10
            ],
            "ScriptFull": "6 / 9, 10"
          },
          "SL": {
            "Planet": "Venus",
            "Occupancy": 5,
            "Ownership": [
              1,
              6
            ],
            "ScriptFull": "5 / 1, 6"
          },
          "NLSL": {
            "Planet": "Moon",
            "Occupancy": 7,
            "Ownership": [
              3
            ],
            "ScriptFull": "7 / 3"
          },
          "PHScriptFull": "",
          "PHScript": [],
          "PHScriptExtra": []
        },
        {
          "RashiDetails": [
            {
              "RashiNumber": 1,
              "RashiRoman": "I",
              "Rashi": "Aries",
              "RashiLord": "Mars",
              "Degree": "14:59:59",
              "RashiDescAstro": "Spontaneous, Resolve, Safety",
              "RashiDescVastu": "East, E6"
            }
          ],
          "HouseAspectsZero": [],
          "HouseAspectsPositive": [],
          "HouseAspectsNegative": [
            {
              "Aspect": 135,
              "IsWithRaKe": true,
              "Planet": "Moon",
              "PlanetRashi": "Sagittarius",
              "PlanetRashiShort": "Sag",
              "ScriptFull": "7 / 3"
            }
          ],
          "House": "12",
          "HouseDescAstro": "Spendings, Weakness, Expenses",
          "HouseDescVastu": "Foreign Travelling, Daily Needs",
          "Degree": "14:59:59",
          "CumulativeDegreeDecimal": 14.9997505,
          "RashiNumber": 1,
          "Rashi": "Aries",
          "Nakshatra": "Bharani",
          "NakshatraPada": "1",
          "Devta": "Yama",
          "EnergyField": "Yama",
          "PL": {
            "Planet": "Mars",
            "Occupancy": 4,
            "Ownership": [
              7,
              12
            ],
            "ScriptFull": "4 / 7, 12"
          },
          "NL": {
            "Planet": "Venus",
            "Occupancy": 5,
            "Ownership": [
              1,
              6
            ],
            "ScriptFull": "5 / 1, 6"
          },
          "SL": {
            "Planet": "Venus",
            "Occupancy": 5,
            "Ownership": [
              1,
              6
            ],
            "ScriptFull": "5 / 1, 6"
          },
          "NLSL": {
            "Planet": "Moon",
            "Occupancy": 7,
            "Ownership": [
              3
            ],
            "ScriptFull": "7 / 3"
          },
          "PHScriptFull": "",
          "PHScript": [],
          "PHScriptExtra": []
        }
      ],
      "Symbols": {
        "IsRetro": "⮌",
        "IsExalted": "🡑",
        "IsDebilitated": "🡓",
        "IsCombust": "☀",
        "IsUntenanted": "★",
        "IsSelfStar": "✪",
        "IsExchange": "⮂"
      }
    }
  }

  // if (!filteredData) {
  //   redirect('/not-found')
  // }

  return <Preview kundliData={kundliData} id={1} />
}

export default PreviewPage
