# OctoFit Tracker frontend

The React 19 and Vite presentation tier reads API data from port `8000`.

## Configure the API URL

Vite reads `VITE_CODESPACE_NAME` when it starts and when it builds the app. In a Codespace, define it in `octofit-tracker/frontend/.env.local` using the Codespace name (not a URL):

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then uses `https://your-codespace-name-8000.app.github.dev`. `VITE_CODESPACE_NAME` must be defined for the Codespaces API URL. If it is unset, the frontend safely falls back to `http://localhost:8000`, which is useful when the API is running locally. Restart the Vite dev server after changing `.env.local`.

## Run the frontend

From the repository root:

```bash
npm run dev --prefix octofit-tracker/frontend
```

The frontend uses `/api/users/`, `/api/teams/`, `/api/activities/`, `/api/leaderboard/`, and `/api/workouts/`. Responses can be plain arrays or paginated objects containing a `results` or `data` array.
