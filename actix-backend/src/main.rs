use actix_backend::{config::core_config, middleware::AdminContextExtractor, model::ModelManager};
use actix_web::{
    get,
    web::{self, Data},
    App, HttpServer, Responder,
};
use tracing::info;
use tracing_subscriber::EnvFilter;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    tracing_subscriber::fmt()
        .without_time()
        .with_target(false)
        .with_env_filter(EnvFilter::from_default_env())
        .init();

    let mm = ModelManager::new()
        .await
        .expect("Model manager failed")
        .clone();

    info!(
        "{:<12} - Server is live",
        "http://{}:{}",
        &core_config().SERVER_URL,
        &core_config().SERVER_PORT
    );
    HttpServer::new(move || {
        App::new()
            .app_data(mm.clone())
            .app_data(Data::new(AdminContextExtractor))
            .service(greet)
    })
    .bind((&core_config().SERVER_URL, &core_config().SERVER_PORT))?
    .run()
    .await
}

#[get("/hello/{name}")]
async fn greet(name: web::Path<String>) -> impl Responder {
    format!("Hello {}!", name)
}
