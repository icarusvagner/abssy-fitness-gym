use crate::{
    config::core_config,
    middleware::TokenClaims,
    model::{froms::auth::LoginReturn, QueryReturn},
};
use actix_web::{
    web::{Data, Json},
    HttpResponse, Responder,
};
use argonautica::Verifier;
use tracing::debug;

use super::{froms::auth::LoginPayload, ModelManager};

pub async fn login_handler(mm: Data<ModelManager>, body: Json<LoginPayload>) -> impl Responder {
    debug!("{:<12} - login_handler", "HANDLER");

    let db = mm.db();

    let query =
        "select id, username, password, token_salt, role_user from user_login where username = ?";
    let LoginPayload { username, password } = body.into_inner();

    match sqlx::query_as::<_, LoginReturn>(query)
        .bind(username)
        .fetch_one(db)
        .await
    {
        Some(user) => {
            let mut verifier = Verifier::default();
            let is_valid = verifier
                .with_hash(user.password)
                .with_password(password)
                .with_secret_key(&core_config().HASH_SECRET)
                .verify()
                .unwrap();
            if is_valid {
                let claims = TokenClaims {
                    id: user.id,
                    username: user.username,
                    token_salt: user.token_salt,
                    role_user: user.role_user,
                };
                HttpResponse::Ok().json(claims)
            } else {
                let error = QueryReturn {
                    message: "Password is invalid".to_string(),
                    status: 403,
                };
                HttpResponse::NotFound().json(error)
            }
        }
        Err(err) => {
            debug!("{:<12} - error login_handler {err:?}", "ERROR_HANDLER");
            let error = QueryReturn {
                message: "Username does not exists".to_string(),
                status: 404,
            };
            HttpResponse::Unauthorized().json(error)
        }
    }
}
