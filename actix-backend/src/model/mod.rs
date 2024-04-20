use serde::Serialize;

use self::store::{new_db_pool, Db};

mod base;
mod error;
mod froms;

pub mod auth;
pub mod store;

pub use self::error::{Error, Result};

#[derive(Debug, Serialize)]
pub struct QueryReturn {
    pub message: String,
    pub status: u32,
}

#[derive(Clone)]
pub struct ModelManager {
    db: Db,
}

impl ModelManager {
    pub async fn new() -> Result<Self> {
        let db = new_db_pool().await?;

        Ok(ModelManager { db })
    }
    pub(crate) fn db(&self) -> &Db {
        &self.db
    }
}
