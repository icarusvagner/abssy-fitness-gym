use std::{env, str::FromStr};

mod error;
mod extract_token;

pub use error::{Error, Result};

pub fn get_env(name: &'static str) -> Result<String> {
    env::var(name).map_err(|_| Error::MissingENV(name))
}

pub fn get_env_as_bytes<T: FromStr>(name: &'static str) -> Result<T> {
    let val = get_env(name)?;

    val.parse::<T>().map_err(|_| Error::WrongFormat(name))
}

pub fn get_env_parse<T: FromStr>(name: &'static str) -> Result<T> {
    let val = get_env(name)?;
    val.parse::<T>().map_err(|_| Error::WrongFormat(name))
}
