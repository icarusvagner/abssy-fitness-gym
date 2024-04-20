use sqlx::{mysql::MySqlPoolOptions, MySql, Pool};

mod error;

pub use error::{Error, Result};

use crate::config::core_config;

pub type Db = Pool<MySql>;

pub async fn new_db_pool() -> Result<Db> {
    let db_url = format!(
        "mariadb://{}:{}@{}:{}/{}",
        &core_config().DB_USER,
        &core_config().DB_PASS,
        &core_config().DB_HOST,
        &core_config().DB_PORT,
        &core_config().DB_NAME
    );

    MySqlPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .map_err(|ex| Error::FailToCreatePool(ex.to_string()))
}
