use serde::{Deserialize, Serialize};
use sqlx::{mysql::MySqlRow, FromRow, Row};

#[derive(Debug, Serialize, Clone)]
pub struct LoginPayload {
    pub username: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LoginReturn {
    pub id: i64,
    pub username: String,
    pub password: String,
    pub token_salt: String,
    pub pass_salt: String,
}

impl FromRow<'_, MySqlRow> for LoginReturn {
    fn from_row(row: &MySqlRow) -> Result<Self, sqlx::Error> {
        Ok(Self {
            id: row.try_get(0)?,
            username: row.try_get(1)?,
            password: row.try_get(2)?,
            token_salt: row.try_get(3)?,
            pass_salt: row.try_get(4)?,
        })
    }
}
