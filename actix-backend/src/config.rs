use std::sync::OnceLock;

use crate::utils::{get_env, get_env_parse};

pub fn core_config() -> &'static CoreConfig {
    static INSTANCE: OnceLock<CoreConfig> = OnceLock::new();

    INSTANCE.get_or_init(|| {
        CoreConfig::load_from_env()
            .unwrap_or_else(|ex| panic!("FATAL ERROR - while loading conf - cause: {ex:?}"))
    })
}

#[allow(non_snake_case)]
pub struct CoreConfig {
    pub DB_NAME: String,
    pub DB_USER: String,
    pub DB_PASS: String,
    pub DB_HOST: String,
    pub DB_PORT: String,

    pub APP_URL: String,

    pub TOKEN_KEY: String,
    pub TOKEN_DURATION_SEC: String,
    pub PASSWORD_KEY: String,
    pub JWT_SECRET: String,
    pub HASH_SECRET: String,

    pub SERVER_URL: String,
    pub SERVER_PORT: u32,
}

impl CoreConfig {
    fn load_from_env() -> crate::utils::Result<CoreConfig> {
        Ok(CoreConfig {
            DB_NAME: get_env("DB_NAME")?,
            DB_USER: get_env("DB_USER")?,
            DB_PASS: get_env("DB_PASS")?,
            DB_HOST: get_env("DB_HOST")?,
            DB_PORT: get_env("DB_PORT")?,
            APP_URL: get_env("APP_URL")?,
            TOKEN_KEY: get_env("TOKEN_KEY")?,
            TOKEN_DURATION_SEC: get_env("TOKEN_DURATION_SEC")?,
            PASSWORD_KEY: get_env("PASSWORD_KEY")?,
            JWT_SECRET: get_env("JWT_SECRET")?,
            HASH_SECRET: get_env("HASH_SECRET")?,
            SERVER_URL: get_env("SERVER_URL")?,
            SERVER_PORT: get_env_parse("SERVER_PORT")?,
        })
    }
}
