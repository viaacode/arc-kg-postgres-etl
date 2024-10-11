from prefect import flow, get_run_logger
from prefect_meemoo.triplydb.credentials import TriplyDBCredentials
from prefect_meemoo.triplydb.tasks import run_javascript
from prefect_sqlalchemy.credentials import DatabaseCredentials
from prefect_meemoo.config.last_run import get_last_run_config, save_last_run_config
from prefect.task_runners import ConcurrentTaskRunner


@flow(
    name="prefect-flow-arc-kg-postgres-etl",
    task_runner=ConcurrentTaskRunner(),
    on_completion=[save_last_run_config],
)
def main_flow(
    triplydb_block_name: str = "triplydb",
    triplydb_owner: str = "meemoo",
    triplydb_dataset: str = "knowledge-graph",
    triplydb_destination_dataset: str = "hetarchief",
    triplydb_destination_graph: str = "hetarchief",
    base_path: str = "/opt/prefect/typescript/",
    script_path: str = "lib/",
    squash_graphs: str = False,
    postgres_block_name: str = "local",  # "hetarchief-tst",
    record_limit: int = None,
    batch_size: int = 100,
    full_sync: bool = False,
):
    """
    Flow to query the TriplyDB dataset and update the graphql database.
    Blocks:
        - triplydb (TriplyDBCredentials): Credentials to connect to MediaHaven
        - hetarchief-tst (PostgresCredentials): Credentials to connect to the postgres database
    """

    # Load credentials
    triply_creds = TriplyDBCredentials.load(triplydb_block_name)
    postgres_creds = DatabaseCredentials.load(postgres_block_name)

    # Figure out start time
    last_modified_date = get_last_run_config("%Y-%m-%d") if not full_sync else None

    # Run javascript
    sync_service_script: str = "index.js"
    
    run_javascript.with_options(
        name=f"Sync KG to services with {sync_service_script}",
    ).submit(
        script_path=base_path + script_path + sync_service_script,
        base_path=base_path,
        triplydb=triply_creds,
        triplydb_owner=triplydb_owner,
        triplydb_dataset=triplydb_dataset,
        triplydb_destination_dataset=triplydb_destination_dataset,
        triplydb_destination_graph=triplydb_destination_graph,
        squash_graphs=squash_graphs,
        postgres=postgres_creds,
        record_limit=record_limit,
        batch_size=batch_size,
        since=last_modified_date,
    )


if __name__ == "__main__":
    main_flow(
        triplydb_block_name="triplydb-meemoo", 
        postgres_block_name="local-hasura", 
        base_path="./typescript/",
        triplydb_dataset="hetarchief",
        squash_graphs=False)
