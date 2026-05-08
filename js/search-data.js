/* ============================================
   LEARNING HUB – Global Search Index
   
   This file contains searchable content from ALL pages.
   When adding a new page, also add entries here.
   
   Each entry: { page, pageTitle, section, content, href }
   - page: filename (e.g., "kafka.html")
   - pageTitle: display name (e.g., "Kafka")
   - section: section heading within the page
   - content: searchable text content
   - href: link with anchor (e.g., "kafka.html#partitions")
   ============================================ */

var SEARCH_INDEX = [

  // ===== INDEX / HOME =====
  { page: "index.html", pageTitle: "Home", section: "Landing Page", content: "Learning Hub personal offline-ready reference developer tools concepts pure HTML no frameworks no dependencies", href: "index.html" },
  { page: "index.html", pageTitle: "Home", section: "Quick Start", content: "clone repo open HTML file browser no server needed GitHub Pages add prompt edit prompts.html add topic copy PAGE_TEMPLATE.html", href: "index.html" },

  // ===== PROMPTS =====
  { page: "prompts.html", pageTitle: "Prompts", section: "Code Review Assistant", content: "Review code bugs security vulnerabilities performance issues best practices severity critical warning suggestion", href: "prompts.html" },
  { page: "prompts.html", pageTitle: "Prompts", section: "Debug This Error", content: "debug error message step-by-step fix edge cases language framework application", href: "prompts.html" },
  { page: "prompts.html", pageTitle: "Prompts", section: "Refactor for Clean Code", content: "refactor SOLID principles clean code readability maintainability testability", href: "prompts.html" },
  { page: "prompts.html", pageTitle: "Prompts", section: "Write Unit Tests", content: "unit tests testing framework happy path edge cases error handling mock dependencies TDD", href: "prompts.html" },
  { page: "prompts.html", pageTitle: "Prompts", section: "Optimize Performance", content: "performance bottlenecks time complexity space complexity database queries memory leaks caching Big O analysis", href: "prompts.html" },
  { page: "prompts.html", pageTitle: "Prompts", section: "Incident Response Runbook", content: "incident response runbook detection triage investigation mitigation resolution post-mortem SRE", href: "prompts.html" },
  { page: "prompts.html", pageTitle: "Prompts", section: "Dockerfile Best Practices", content: "Dockerfile optimize multi-stage builds layer caching security non-root user minimal base image", href: "prompts.html" },
  { page: "prompts.html", pageTitle: "Prompts", section: "CI/CD Pipeline Design", content: "CI/CD pipeline GitHub Actions GitLab CI stages caching rollback deployment", href: "prompts.html" },
  { page: "prompts.html", pageTitle: "Prompts", section: "Kubernetes Troubleshooting", content: "Kubernetes pod CrashLoopBackOff Pending ImagePullBackOff OOMKilled kubectl describe diagnose", href: "prompts.html" },
  { page: "prompts.html", pageTitle: "Prompts", section: "System Design Review", content: "system architecture scalability reliability performance security cost users requests per second", href: "prompts.html" },
  { page: "prompts.html", pageTitle: "Prompts", section: "Database Schema Design", content: "database schema entities relationships normalization migration SQL NoSQL indexes query patterns", href: "prompts.html" },
  { page: "prompts.html", pageTitle: "Prompts", section: "API Design Review", content: "API REST URL structure HTTP methods status codes pagination error response versioning rate limiting authentication", href: "prompts.html" },
  { page: "prompts.html", pageTitle: "Prompts", section: "Microservices Decomposition", content: "microservices monolith Domain-Driven Design service boundaries communication sync async data ownership strangler fig pattern", href: "prompts.html" },
  { page: "prompts.html", pageTitle: "Prompts", section: "README Generator", content: "README markdown badges features prerequisites installation configuration usage examples contributing license", href: "prompts.html" },
  { page: "prompts.html", pageTitle: "Prompts", section: "Prompt Engineering", content: "prompt optimization chain-of-thought few-shot system prompt structured output JSON persona guidelines", href: "prompts.html" },

  // ===== REDIS =====
  { page: "redis.html", pageTitle: "Redis", section: "Core Concepts", content: "Redis in-memory sub-millisecond latency RDB snapshots AOF logs data structures strings hashes lists sets sorted sets streams bitmaps HyperLogLog geospatial publish subscribe pub/sub leader-follower replication Redis Sentinel Redis Cluster horizontal sharding", href: "redis.html" },
  { page: "redis.html", pageTitle: "Redis", section: "String Commands", content: "SET GET MSET MGET INCR DECR SETEX SETNX APPEND STRLEN key-value pair increment decrement expiry set if not exists", href: "redis.html" },
  { page: "redis.html", pageTitle: "Redis", section: "Hash Commands", content: "HSET HGET HMSET HGETALL HDEL HEXISTS HINCRBY HKEYS hash field multiple fields", href: "redis.html" },
  { page: "redis.html", pageTitle: "Redis", section: "List Commands", content: "LPUSH RPUSH LPOP RPOP LRANGE LLEN LINDEX BRPOP push pop head tail blocking queue", href: "redis.html" },
  { page: "redis.html", pageTitle: "Redis", section: "Set & Sorted Set Commands", content: "SADD SMEMBERS SISMEMBER SINTER SUNION ZADD ZRANGE ZRANGEBYSCORE ZRANK intersection union sorted set score leaderboard rank", href: "redis.html" },
  { page: "redis.html", pageTitle: "Redis", section: "Cache-Aside Pattern", content: "cache-aside check Redis miss query database write TTL caching strategy", href: "redis.html" },
  { page: "redis.html", pageTitle: "Redis", section: "Distributed Lock", content: "distributed lock SET NX EX mutual exclusion across processes locking resource", href: "redis.html" },
  { page: "redis.html", pageTitle: "Redis", section: "Rate Limiting", content: "rate limiting INCR EXPIRE sliding window threshold requests per second", href: "redis.html" },
  { page: "redis.html", pageTitle: "Redis", section: "Persistence", content: "RDB point-in-time snapshots AOF append-only file combined persistence durability fast recovery no persistence cache", href: "redis.html" },

  // ===== HELM =====
  { page: "helm.html", pageTitle: "Helm", section: "Core Concepts", content: "Helm chart release repository values Kubernetes package manager pre-configured resources templates default values metadata", href: "helm.html" },
  { page: "helm.html", pageTitle: "Helm", section: "Essential Commands", content: "helm install upgrade rollback uninstall list status history template lint package repo add repo update search show values diff", href: "helm.html" },
  { page: "helm.html", pageTitle: "Helm", section: "Chart Structure", content: "Chart.yaml Chart.lock values.yaml values.schema.json templates _helpers.tpl deployment.yaml service.yaml ingress.yaml hpa.yaml configmap.yaml secret.yaml NOTES.txt charts .helmignore", href: "helm.html" },
  { page: "helm.html", pageTitle: "Helm", section: "Templating", content: "templating .Values .Release.Name .Release.Namespace conditionals if end range loop include define helper functions _helpers.tpl quote", href: "helm.html" },
  { page: "helm.html", pageTitle: "Helm", section: "Lifecycle & Hooks", content: "hooks pre-install post-install pre-upgrade post-upgrade pre-rollback post-rollback pre-delete post-delete migrations backups notifications smoke tests", href: "helm.html" },
  { page: "helm.html", pageTitle: "Helm", section: "Best Practices", content: "helm template before installing pin chart versions values.schema.json namespace atomic auto-rollback lint CI no hardcode no latest image tags no secrets in values.yaml no kubectl modify", href: "helm.html" },

  // ===== ELASTICSEARCH =====
  { page: "elasticsearch.html", pageTitle: "Elasticsearch", section: "Core Concepts", content: "Elasticsearch index document mapping shard Lucene replica full-text search analytics JSON field types text keyword integer date analyzers", href: "elasticsearch.html" },
  { page: "elasticsearch.html", pageTitle: "Elasticsearch", section: "CRUD Operations", content: "create index delete index index document GET PUT POST DELETE _doc _update _bulk _search _count REST API", href: "elasticsearch.html" },
  { page: "elasticsearch.html", pageTitle: "Elasticsearch", section: "Query DSL", content: "Query DSL match query bool query must filter must_not range query nested query full-text search analyzer conditions", href: "elasticsearch.html" },
  { page: "elasticsearch.html", pageTitle: "Elasticsearch", section: "Aggregations", content: "aggregations date_histogram terms sum avg total_revenue sales_per_month top_categories metrics bucket analytics", href: "elasticsearch.html" },
  { page: "elasticsearch.html", pageTitle: "Elasticsearch", section: "Mapping & Analyzers", content: "mapping properties text keyword date integer geo_point custom analyzer tokenizer standard lowercase stop snowball number_of_shards number_of_replicas settings", href: "elasticsearch.html" },
  { page: "elasticsearch.html", pageTitle: "Elasticsearch", section: "Cluster Management", content: "cluster health green yellow red _cat indices nodes shards allocation _refresh _forcemerge _settings disk usage", href: "elasticsearch.html" },

  // ===== KAFKA =====
  { page: "kafka.html", pageTitle: "Kafka", section: "What is Kafka", content: "Apache Kafka distributed event streaming platform high-throughput fault-tolerant real-time data pipelines LinkedIn open source publish subscribe messaging", href: "kafka.html" },
  { page: "kafka.html", pageTitle: "Kafka", section: "Core Architecture", content: "broker topic partition consumer group offset replication leader follower cluster ZooKeeper KRaft controller quorum metadata management", href: "kafka.html" },
  { page: "kafka.html", pageTitle: "Kafka", section: "Topics & Partitions", content: "topic named category feed messages partitions ordered immutable append-only commit log segment parallelism horizontal scaling partition key hash routing message ordering guarantees within partition", href: "kafka.html" },
  { page: "kafka.html", pageTitle: "Kafka", section: "Partition Deep Dive", content: "partition leader follower replica ISR in-sync replicas replication factor acknowledgement acks write read leader election controller preferred leader under-replicated unclean leader election", href: "kafka.html" },
  { page: "kafka.html", pageTitle: "Kafka", section: "Producers", content: "producer send message acks fire-and-forget synchronous asynchronous batching linger.ms batch.size compression snappy lz4 zstd idempotent exactly-once retries max.in.flight.requests key partitioner round-robin sticky", href: "kafka.html" },
  { page: "kafka.html", pageTitle: "Kafka", section: "Consumers & Consumer Groups", content: "consumer consumer group partition assignment rebalance cooperative incremental offset commit auto commit manual commit earliest latest group coordinator heartbeat session timeout poll consumer lag monitoring", href: "kafka.html" },
  { page: "kafka.html", pageTitle: "Kafka", section: "Delivery Semantics", content: "at-most-once at-least-once exactly-once delivery semantics idempotent producer transactions transactional.id isolation.level read_committed enable.idempotence", href: "kafka.html" },
  { page: "kafka.html", pageTitle: "Kafka", section: "Performance", content: "performance throughput latency zero-copy sendfile page cache sequential disk I/O batching compression partition count broker hardware network memory disk SSD NVMe JVM heap GC tuning", href: "kafka.html" },
  { page: "kafka.html", pageTitle: "Kafka", section: "Kafka Connect", content: "Kafka Connect source connector sink connector connector configuration tasks workers distributed standalone Debezium CDC JDBC S3 Elasticsearch", href: "kafka.html" },
  { page: "kafka.html", pageTitle: "Kafka", section: "Kafka Streams", content: "Kafka Streams stream processing KStream KTable GlobalKTable stateful stateless windowed aggregations joins topology processor API DSL exactly-once state store RocksDB changelog", href: "kafka.html" },
  { page: "kafka.html", pageTitle: "Kafka", section: "Schema Registry", content: "Schema Registry Avro Protobuf JSON Schema schema evolution compatibility backward forward full subject naming strategy serializer deserializer", href: "kafka.html" },
  { page: "kafka.html", pageTitle: "Kafka", section: "Production Best Practices", content: "production replication factor 3 min.insync.replicas 2 acks all unclean.leader.election.enable false retention monitoring lag alerts JMX metrics Burrow consumer lag", href: "kafka.html" },
  { page: "kafka.html", pageTitle: "Kafka", section: "CLI Commands", content: "kafka-topics create list describe delete kafka-console-producer kafka-console-consumer kafka-consumer-groups reset-offsets bootstrap-server", href: "kafka.html" }

  // ===== KUBERNETES =====
  { page: "kubernetes.html", pageTitle: "Kubernetes", section: "Core Concepts", content: "Update this content to improve search visibility", href: "kubernetes.html#sec-core-concepts" }

  // ===== KUBERNETES =====
  { page: "kubernetes.html", pageTitle: "Kubernetes", section: "Core Concepts", content: "Update this content to improve search visibility", href: "kubernetes.html#sec-core-concepts" }
];
