// Directory containing the .sparql files
export const QUERY_PATH = '../queries'

// RDF constants
export const NAMESPACE = 'https://data.hetarchief.be/ns/test/'
export const GRAPH_BASE = 'https://data.hetarchief.be/graph/'
export const TABLE_PRED = `${NAMESPACE}tableName`
export const XSD_DURATION = 'http://www.w3.org/2001/XMLSchema#duration'

// ENV variables
export const BATCH_SIZE = parseInt(process.env.BATCH_SIZE ?? '100', 10)
export const RECORD_LIMIT = process.env.RECORD_LIMIT ? parseInt(process.env.RECORD_LIMIT, 10) : null
export const SINCE = process.env.SINCE ? new Date(process.env.SINCE) : null
export const SQUASH_GRAPHS = process.env.SQUASH_GRAPHS === 'True'
export const ACCOUNT = process.env.TRIPLYDB_OWNER ?? 'meemoo'
export const DATASET = process.env.TRIPLYDB_DATASET ?? 'knowledge-graph'
export const DESTINATION_DATASET = process.env.TRIPLYDB_DESTINATION_DATASET || DATASET
export const DESTINATION_GRAPH = process.env.TRIPLYDB_DESTINATION_GRAPH || 'hetarchief'

export const TOKEN = process.env.TRIPLYDB_TOKEN

// PostgreSQL connection settings
export const dbConfig = {
    port: parseInt(process.env.POSTGRES_PORT ?? '5555', 10),
    database: process.env.POSTGRES_DATABASE ?? 'hetarchief',
    host: process.env.POSTGRES_HOST ?? 'localhost',
    user: process.env.POSTGRES_USERNAME ?? 'hetarchief',
    password: process.env.POSTGRES_PASSWORD ?? 'password',
    //url: process.env.POSTGRES_URL,
}

// Map RecordType to target tables and dynamic column configuration
export const tables: string[] = 
    [
        'graph.organization',
        'graph.organization_has_preference',
        'graph.intellectual_entity',
        'graph.schema_license',
        'graph.file',
        'graph.carrier', 
        'graph.representation',
        'graph.thing',
        'graph.schema_role',
        'graph.collection',
        'graph.dcterms_format',
        'graph.ha_des_coloring_type',
        'graph.includes',
        'graph.mh_fragment_identifier',
        'graph.newspaper_schema_alternate_name',
        'graph.newspaper_schema_in_language',
        'graph.premis_identifier',
        'graph.representation',
        'graph.schema_alternate_name',
        'graph.schema_contact_point',
        'graph.schema_copyright_holder',
        'graph.schema_genre',
        'graph.schema_in_language',
        'graph.schema_is_part_of',
        'graph.schema_keywords',
        'graph.schema_mentions',
    ]




