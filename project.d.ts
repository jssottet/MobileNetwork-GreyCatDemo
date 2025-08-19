// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
declare namespace gc {
  namespace project {
    class Root extends gc.sdk.GCObject {
      static readonly _type = 'project::Root';
      "model::nrCellCU_by_index": gc.core.nodeList<gc.core.node<gc.model.NrCellCU>>;
      "model::nrCellCU_by_nRCellId": gc.core.nodeList<gc.core.node<gc.model.NrCellCU>>;
    }

  }

  namespace logs_importer {
  }

  namespace model {
    class UE extends gc.sdk.GCObject {
      static readonly _type = 'model::UE';
      id: number | bigint;
      rnti: string;
      pdus: gc.core.nodeList<gc.model.PDUSession>;
      du: gc.core.node<gc.model.NrCellDU>;
      position: number | bigint;
      synchronizationSignal: gc.core.nodeTime<gc.model.SynchronizationSignal>;
      constructor(id: number | bigint, rnti: string, pdus: gc.core.nodeList<gc.model.PDUSession>, du: gc.core.node<gc.model.NrCellDU>, position: number | bigint, synchronizationSignal: gc.core.nodeTime<gc.model.SynchronizationSignal>);
      static createFrom(fields: {id: number | bigint, rnti: string, pdus: gc.core.nodeList<gc.model.PDUSession>, du: gc.core.node<gc.model.NrCellDU>, position: number | bigint, synchronizationSignal: gc.core.nodeTime<gc.model.SynchronizationSignal>}): UE;
    }

    class CommunicationTypeUtils extends gc.sdk.GCObject {
      static readonly _type = 'model::CommunicationTypeUtils';
    }

    class PDUSession extends gc.sdk.GCObject {
      static readonly _type = 'model::PDUSession';
      id: number | bigint;
      status: gc.model.PDUSessionStatus;
      constructor(id: number | bigint, status: gc.model.PDUSessionStatus);
      static createFrom(fields: {id: number | bigint, status: gc.model.PDUSessionStatus}): PDUSession;
    }

    class BWP extends gc.sdk.GCObject {
      static readonly _type = 'model::BWP';
      subCarrierSpacing: number | bigint;
      numberOfRBs: number | bigint;
      constructor(subCarrierSpacing: number | bigint, numberOfRBs: number | bigint);
      static createFrom(fields: {subCarrierSpacing: number | bigint, numberOfRBs: number | bigint}): BWP;
    }

    class SynchronizationSignal extends gc.sdk.GCObject {
      static readonly _type = 'model::SynchronizationSignal';
      rsrp: number | bigint;
      rsrq: number;
      sinr: number;
      constructor(rsrp: number | bigint, rsrq: number, sinr: number);
      static createFrom(fields: {rsrp: number | bigint, rsrq: number, sinr: number}): SynchronizationSignal;
    }

    class TDD extends gc.sdk.GCObject {
      static readonly _type = 'model::TDD';
      band: number | bigint;
      arfcn: number | bigint;
      constructor(band: number | bigint, arfcn: number | bigint);
      static createFrom(fields: {band: number | bigint, arfcn: number | bigint}): TDD;
    }

    class NrCellCU extends gc.sdk.GCObject {
      static readonly _type = 'model::NrCellCU';
      nRCellId: number | bigint;
      physicalCellId: number | bigint;
      nrCellDU_by_duId: gc.core.nodeList<gc.core.node<gc.model.NrCellDU>>;
      nrCellDU_by_index: gc.core.nodeList<gc.core.node<gc.model.NrCellDU>>;
      constructor(nRCellId: number | bigint, physicalCellId: number | bigint, nrCellDU_by_duId: gc.core.nodeList<gc.core.node<gc.model.NrCellDU>>, nrCellDU_by_index: gc.core.nodeList<gc.core.node<gc.model.NrCellDU>>);
      static createFrom(fields: {nRCellId: number | bigint, physicalCellId: number | bigint, nrCellDU_by_duId: gc.core.nodeList<gc.core.node<gc.model.NrCellDU>>, nrCellDU_by_index: gc.core.nodeList<gc.core.node<gc.model.NrCellDU>>}): NrCellCU;
    }

    class PDUSessionStatus extends gc.sdk.GCEnum {
      static readonly _type = 'model::PDUSessionStatus';
      static readonly $fields: PDUSessionStatus[];
      key: PDUSessionStatus.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: PDUSessionStatus.Field);
      static ESTABLISHED: PDUSessionStatus;
    }
    namespace PDUSessionStatus  {
      type Field = "ESTABLISHED";
    }

    class CommunicationType extends gc.sdk.GCEnum {
      static readonly _type = 'model::CommunicationType';
      static readonly $fields: CommunicationType[];
      key: CommunicationType.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: CommunicationType.Field);
      static TDD: CommunicationType;
      static FDD: CommunicationType;
    }
    namespace CommunicationType  {
      type Field = "TDD"|"FDD";
    }

    class NrCellDU extends gc.sdk.GCObject {
      static readonly _type = 'model::NrCellDU';
      nRCellId: number | bigint;
      physicalCellId: number | bigint;
      nrCellCU: gc.core.node<gc.model.NrCellCU>;
      ssb: gc.model.SSB;
      policy: gc.model.CommunicationType;
      tdd: gc.model.TDD | null;
      bwp: gc.model.BWP;
      userEquipments: gc.core.nodeTime<gc.core.nodeList<gc.core.node<gc.model.UE>>>;
      constructor(nRCellId: number | bigint, physicalCellId: number | bigint, nrCellCU: gc.core.node<gc.model.NrCellCU>, ssb: gc.model.SSB, policy: gc.model.CommunicationType, tdd: gc.model.TDD | null, bwp: gc.model.BWP, userEquipments: gc.core.nodeTime<gc.core.nodeList<gc.core.node<gc.model.UE>>>);
      static createFrom(fields: {nRCellId: number | bigint, physicalCellId: number | bigint, nrCellCU: gc.core.node<gc.model.NrCellCU>, ssb: gc.model.SSB, policy: gc.model.CommunicationType, tdd?: gc.model.TDD | null, bwp: gc.model.BWP, userEquipments: gc.core.nodeTime<gc.core.nodeList<gc.core.node<gc.model.UE>>>}): NrCellDU;
    }

    class SSB extends gc.sdk.GCObject {
      static readonly _type = 'model::SSB';
      arfcn: number | bigint;
      constructor(arfcn: number | bigint);
      static createFrom(fields: {arfcn: number | bigint}): SSB;
    }

  }

  namespace api {
    class graphSnapshot$args extends gc.sdk.GCObject {
      static readonly _type = 'api::graphSnapshot$args';
      t: gc.core.time | null;
      constructor(t?: gc.core.time | null);
      static createFrom(fields: {t?: gc.core.time | null}): graphSnapshot$args;
    }

    class NetworkSnapshot extends gc.sdk.GCObject {
      static readonly _type = 'api::NetworkSnapshot';
      nodes: globalThis.Array<gc.api.NetworkNodeItem>;
      edges: globalThis.Array<gc.api.NetworkEdgeItem>;
      constructor(nodes: globalThis.Array<gc.api.NetworkNodeItem>, edges: globalThis.Array<gc.api.NetworkEdgeItem>);
      static createFrom(fields: {nodes: globalThis.Array<gc.api.NetworkNodeItem>, edges: globalThis.Array<gc.api.NetworkEdgeItem>}): NetworkSnapshot;
    }

    class ueSignal$args extends gc.sdk.GCObject {
      static readonly _type = 'api::ueSignal$args';
      ueId: string;
      t: gc.core.time;
      constructor(ueId: string, t: gc.core.time);
      static createFrom(fields: {ueId: string, t: gc.core.time}): ueSignal$args;
    }

    class NetworkEdgeItem extends gc.sdk.GCObject {
      static readonly _type = 'api::NetworkEdgeItem';
      id: string;
      from: string;
      to: string;
      constructor(id: string, from: string, to: string);
      static createFrom(fields: {id: string, from: string, to: string}): NetworkEdgeItem;
    }

    class NetworkNodeItem extends gc.sdk.GCObject {
      static readonly _type = 'api::NetworkNodeItem';
      id: string;
      type: string;
      label: string;
      constructor(id: string, type: string, label: string);
      static createFrom(fields: {id: string, type: string, label: string}): NetworkNodeItem;
    }

    function graphSnapshot(t?: gc.core.time | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.api.NetworkSnapshot>;
    function ueSignal(ueId: string, t: gc.core.time, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<number>;
  }

  namespace sdk {
    interface GreyCat {
        call(method: 'api::graphSnapshot', args: [gc.core.time | null], signal?: globalThis.AbortSignal): Promise<gc.api.NetworkSnapshot>;
        spawn(method: 'api::graphSnapshot', args: [gc.core.time | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'api::graphSnapshot', args: [gc.core.time | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.api.NetworkSnapshot>;
        call(method: 'api::ueSignal', args: [string, gc.core.time], signal?: globalThis.AbortSignal): Promise<number>;
        spawn(method: 'api::ueSignal', args: [string, gc.core.time], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'api::ueSignal', args: [string, gc.core.time], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<number>;
    }
  }
  interface $TypesMap {
    'core::Array<core::NodeInfo<core::time>>': 0,
    'core::ErrorCode': 0,
    'core::Table': 0,
    'core::nodeIndex': 0,
    'core::GeoCircle': 0,
    'core::nodeList<core::node<model::NrCellDU>>': 0,
    'core::Map<core::String,core::int>': 0,
    'core::TimeZone': 0,
    'core::node<model::NrCellCU>': 0,
    'core::Array<core::NodeInfo<core::geo>>': 0,
    'core::Map<core::String,runtime::UserCredential>': 0,
    'core::Array<core::int?>': 0,
    'core::node<model::NrCellDU>': 0,
    'core::Array<core::nodeTime>': 0,
    'core::Table$applyMappings$args': 0,
    'core::String': 0,
    'core::Array<model::SynchronizationSignal>': 0,
    'core::Array<api::NetworkNodeItem>': 0,
    'core::GeoBox': 0,
    'core::MathConstants': 0,
    'core::Array<core::node?>': 0,
    'core::field': 0,
    'core::CalendarUnit': 0,
    'core::Array<runtime::Frame>': 0,
    'core::Tuple<core::time,core::nodeList<core::node<model::UE>>>': 0,
    'core::Buffer': 0,
    'core::Array<runtime::Role>': 0,
    'core::Date$from_time$args': 0,
    'core::nodeList': 0,
    'core::Array<runtime::Variable>': 0,
    'core::Map<core::any,core::int>': 0,
    'core::Array<io::CsvColumnStatistics>': 0,
    'core::nodeTime$sample$args': 0,
    'core::nodeTime': 0,
    'core::nodeList$sample$args': 0,
    'core::t3': 0,
    'core::duration': 0,
    'core::Tensor': 0,
    'core::node<model::UE>': 0,
    'core::Array<core::ErrorFrame>': 0,
    'core::Array<util::HistogramBin>': 0,
    'core::nodeTime<model::SynchronizationSignal>': 0,
    'core::nodeTimeSingleton': 0,
    'core::SortOrder': 0,
    'core::NodeInfo': 0,
    'core::Table<core::Tuple<core::time,core::any?>>': 0,
    'core::nodeIndex$sample$args': 0,
    'core::Array<runtime::Permission>': 0,
    'core::Array<runtime::UserGroupPolicy>': 0,
    'core::Array<core::nodeIndex>': 0,
    'core::t4f': 0,
    'core::null': 0,
    'core::type': 0,
    'core::Array<runtime::PeriodicTask>': 0,
    'core::geo': 0,
    'core::SamplingMode': 0,
    'core::Error': 0,
    'core::Map': 0,
    'core::Array<core::geo>': 0,
    'core::Array<core::nodeList>': 0,
    'core::nodeTimeCursor': 0,
    'core::nodeGeo$info$args': 0,
    'core::Array<runtime::Job>': 0,
    'core::Array<io::HttpHeader>': 0,
    'core::nodeGeo': 0,
    'core::Array<core::int>': 0,
    'core::node': 0,
    'core::DurationUnit': 0,
    'core::NodeInfo<core::int>': 0,
    'core::Array<runtime::SecurityEntity>': 0,
    'core::Array<util::Quantizer>': 0,
    'core::Tuple<core::time,core::any?>': 0,
    'core::TableColumnMapping': 0,
    'core::TensorType': 0,
    'core::nodeList<core::node<model::NrCellCU>>': 0,
    'core::Tuple': 0,
    'core::time': 0,
    'core::bool': 0,
    'core::Array<core::String>': 0,
    'core::nodeIndex$info$args': 0,
    'core::t2': 0,
    'core::Array<core::TableColumnMapping>': 0,
    'core::nodeGeo$sample$args': 0,
    'core::ErrorFrame': 0,
    'core::Table<util::GaussianProfileSlot?>': 0,
    'core::t4': 0,
    'core::Array<core::nodeList<core::node<model::UE>>>': 0,
    'core::nodeTime<core::nodeList<core::node<model::UE>>>': 0,
    'core::nodeList<model::PDUSession>': 0,
    'core::Array': 0,
    'core::Array<core::NodeInfo>': 0,
    'core::Tuple<core::time,model::SynchronizationSignal>': 0,
    'core::GeoPoly': 0,
    'core::FloatPrecision': 0,
    'core::Array<core::nodeGeo>': 0,
    'core::node$resolve_all$args': 0,
    'core::char': 0,
    'core::any': 0,
    'core::float': 0,
    'core::Array<io::File>': 0,
    'core::nodeTime$info$args': 0,
    'core::int': 0,
    'core::t3f': 0,
    'core::Array<core::any>': 0,
    'core::str': 0,
    'core::Array<runtime::UserCredential>': 0,
    'core::NodeInfo<core::time>': 0,
    'core::Array<api::NetworkEdgeItem>': 0,
    'core::Array<runtime::Task>': 0,
    'core::Date': 0,
    'core::Array<core::field>': 0,
    'core::NodeInfo<core::geo>': 0,
    'core::function': 0,
    'core::nodeList<core::node<model::UE>>': 0,
    'core::t2f': 0,
    'core::Map<core::String,core::String>': 0,
    'core::Array<core::NodeInfo<core::int>>': 0,
    'core::nodeList$info$args': 0,
    'runtime::Permission$all$args': 0,
    'runtime::RuntimeInfo': 0,
    'runtime::PeriodicTask': 0,
    'runtime::User$current$args': 0,
    'runtime::Log': 0,
    'runtime::SecurityFields$set$args': 0,
    'runtime::User$me$args': 0,
    'runtime::SecurityEntity$set$args': 0,
    'runtime::User$renew$args': 0,
    'runtime::SecurityEntity$all$args': 0,
    'runtime::SecurityFields$get$args': 0,
    'runtime::PeriodicTask$set$args': 0,
    'runtime::OpenIDConnect': 0,
    'runtime::Task$history$args': 0,
    'runtime::User$tokenLogin$args': 0,
    'runtime::Variable': 0,
    'runtime::MergeStrategy': 0,
    'runtime::UserCredential': 0,
    'runtime::UserGroup': 0,
    'runtime::User$permissions$args': 0,
    'runtime::Role$all$args': 0,
    'runtime::Runtime$info$args': 0,
    'runtime::Frame': 0,
    'runtime::Debug$all$args': 0,
    'runtime::Job': 0,
    'runtime::Runtime$abi$args': 0,
    'runtime::UserGroupPolicyType': 0,
    'runtime::SecurityFields': 0,
    'runtime::Task$is_running$args': 0,
    'runtime::Runtime$root$args': 0,
    'runtime::Task$cancel$args': 0,
    'runtime::LogLevel': 0,
    'runtime::Debug$get$args': 0,
    'runtime::TaskStatus': 0,
    'runtime::User$login$args': 0,
    'runtime::Permission': 0,
    'runtime::User': 0,
    'runtime::User$setPassword$args': 0,
    'runtime::LogDataUsage': 0,
    'runtime::SecurityPolicy': 0,
    'runtime::Debug': 0,
    'runtime::Debug$resume$args': 0,
    'runtime::Task': 0,
    'runtime::LicenseType': 0,
    'runtime::UserGroupPolicy': 0,
    'runtime::License': 0,
    'runtime::PeriodicTask$all$args': 0,
    'runtime::System': 0,
    'runtime::Role': 0,
    'runtime::Task$running$args': 0,
    'runtime::OpenIDConnect$config$args': 0,
    'runtime::User$logout$args': 0,
    'runtime::Runtime': 0,
    'runtime::SecurityEntity': 0,
    'io::Json': 0,
    'io::Reader<core::any>': 0,
    'io::GcbWriter': 0,
    'io::CsvWriter': 0,
    'io::CsvStatistics': 0,
    'io::CsvSharding': 0,
    'io::CsvReader': 0,
    'io::TextWriter': 0,
    'io::TextReader': 0,
    'io::Csv$analyze$args': 0,
    'io::Http': 0,
    'io::File': 0,
    'io::SmtpMode': 0,
    'io::SmtpAuth': 0,
    'io::Writer': 0,
    'io::Csv$generate$args': 0,
    'io::FileWalker': 0,
    'io::HttpHeader': 0,
    'io::Csv$sample$args': 0,
    'io::CsvAnalysisConfig': 0,
    'io::GcbReader': 0,
    'io::Url': 0,
    'io::CsvFormat': 0,
    'io::Reader': 0,
    'io::XmlReader': 0,
    'io::CsvColumnStatistics': 0,
    'io::JsonReader': 0,
    'io::Csv': 0,
    'io::JsonWriter': 0,
    'io::Smtp': 0,
    'io::JsonReader<core::any>': 0,
    'io::Reader<core::String>': 0,
    'io::Email': 0,
    'util::SlidingWindow': 0,
    'util::Random': 0,
    'util::Crypto': 0,
    'util::Histogram': 0,
    'util::Gaussian': 0,
    'util::TimeWindow': 0,
    'util::MultiQuantizer': 0,
    'util::Queue': 0,
    'util::LogQuantizer': 0,
    'util::GaussianProfileSlot': 0,
    'util::Plot': 0,
    'util::QuantizerSlotBound<core::Array>': 0,
    'util::HistogramBin': 0,
    'util::Quantizer': 0,
    'util::GaussianProfile': 0,
    'util::LinearQuantizer': 0,
    'util::Assert': 0,
    'util::CustomQuantizer': 0,
    'util::HistogramStats': 0,
    'util::ProgressTracker': 0,
    'util::Quantizer<core::Array>': 0,
    'util::QuantizerSlotBound': 0,
    'util::Stack': 0,
    'project::Root': 0,
    'model::UE': 0,
    'model::CommunicationTypeUtils': 0,
    'model::PDUSession': 0,
    'model::BWP': 0,
    'model::SynchronizationSignal': 0,
    'model::TDD': 0,
    'model::NrCellCU': 0,
    'model::PDUSessionStatus': 0,
    'model::CommunicationType': 0,
    'model::NrCellDU': 0,
    'model::SSB': 0,
    'api::graphSnapshot$args': 0,
    'api::NetworkSnapshot': 0,
    'api::ueSignal$args': 0,
    'api::NetworkEdgeItem': 0,
    'api::NetworkNodeItem': 0,
  }

  interface $FieldsMap {
    'core::GeoCircle::center': 0,
    'core::GeoCircle::radius': 0,
    'core::Table$applyMappings$args::table': 0,
    'core::Table$applyMappings$args::mappings': 0,
    'core::GeoBox::sw': 0,
    'core::GeoBox::ne': 0,
    'core::Date$from_time$args::time': 0,
    'core::Date$from_time$args::tz': 0,
    'core::nodeTime$sample$args::refs': 0,
    'core::nodeTime$sample$args::from': 0,
    'core::nodeTime$sample$args::to': 0,
    'core::nodeTime$sample$args::maxRows': 0,
    'core::nodeTime$sample$args::mode': 0,
    'core::nodeTime$sample$args::maxDephasing': 0,
    'core::nodeTime$sample$args::tz': 0,
    'core::nodeList$sample$args::refs': 0,
    'core::nodeList$sample$args::from': 0,
    'core::nodeList$sample$args::to': 0,
    'core::nodeList$sample$args::maxRows': 0,
    'core::nodeList$sample$args::mode': 0,
    'core::nodeList$sample$args::maxDephasing': 0,
    'core::nodeTimeSingleton::t': 0,
    'core::nodeTimeSingleton::v': 0,
    'core::NodeInfo::size': 0,
    'core::NodeInfo::from': 0,
    'core::NodeInfo::to': 0,
    'core::nodeIndex$sample$args::refs': 0,
    'core::nodeIndex$sample$args::from': 0,
    'core::nodeIndex$sample$args::maxRows': 0,
    'core::nodeIndex$sample$args::mode': 0,
    'core::Error::message': 0,
    'core::Error::stack': 0,
    'core::nodeTimeCursor::n': 0,
    'core::nodeTimeCursor::req_time': 0,
    'core::nodeGeo$info$args::nodes': 0,
    'core::TableColumnMapping::column': 0,
    'core::TableColumnMapping::extractors': 0,
    'core::Tuple::x': 0,
    'core::Tuple::y': 0,
    'core::nodeIndex$info$args::nodes': 0,
    'core::nodeGeo$sample$args::refs': 0,
    'core::nodeGeo$sample$args::from': 0,
    'core::nodeGeo$sample$args::to': 0,
    'core::nodeGeo$sample$args::maxRows': 0,
    'core::nodeGeo$sample$args::mode': 0,
    'core::ErrorFrame::module': 0,
    'core::ErrorFrame::function': 0,
    'core::ErrorFrame::line': 0,
    'core::ErrorFrame::column': 0,
    'core::GeoPoly::points': 0,
    'core::node$resolve_all$args::n': 0,
    'core::nodeTime$info$args::nodes': 0,
    'core::Date::year': 0,
    'core::Date::month': 0,
    'core::Date::day': 0,
    'core::Date::hour': 0,
    'core::Date::minute': 0,
    'core::Date::second': 0,
    'core::Date::microsecond': 0,
    'core::nodeList$info$args::nodes': 0,
    'runtime::RuntimeInfo::version': 0,
    'runtime::RuntimeInfo::program_version': 0,
    'runtime::RuntimeInfo::arch': 0,
    'runtime::RuntimeInfo::timezone': 0,
    'runtime::RuntimeInfo::license': 0,
    'runtime::RuntimeInfo::io_threads': 0,
    'runtime::RuntimeInfo::bg_threads': 0,
    'runtime::RuntimeInfo::fg_threads': 0,
    'runtime::RuntimeInfo::mem_total': 0,
    'runtime::RuntimeInfo::mem_worker': 0,
    'runtime::RuntimeInfo::disk_data_bytes': 0,
    'runtime::PeriodicTask::function': 0,
    'runtime::PeriodicTask::user_id': 0,
    'runtime::PeriodicTask::arguments': 0,
    'runtime::PeriodicTask::start': 0,
    'runtime::PeriodicTask::every': 0,
    'runtime::Log::level': 0,
    'runtime::Log::time': 0,
    'runtime::Log::user_id': 0,
    'runtime::Log::id': 0,
    'runtime::Log::id2': 0,
    'runtime::Log::src': 0,
    'runtime::Log::tag': 0,
    'runtime::Log::data': 0,
    'runtime::SecurityFields$set$args::f': 0,
    'runtime::SecurityEntity$set$args::entity': 0,
    'runtime::User$renew$args::use_cookie': 0,
    'runtime::PeriodicTask$set$args::tasks': 0,
    'runtime::OpenIDConnect::url': 0,
    'runtime::OpenIDConnect::clientId': 0,
    'runtime::Task$history$args::offset': 0,
    'runtime::Task$history$args::max': 0,
    'runtime::User$tokenLogin$args::token': 0,
    'runtime::User$tokenLogin$args::use_cookie': 0,
    'runtime::Variable::name': 0,
    'runtime::Variable::value': 0,
    'runtime::UserCredential::offset': 0,
    'runtime::UserCredential::pass': 0,
    'runtime::UserGroup::id': 0,
    'runtime::UserGroup::name': 0,
    'runtime::UserGroup::activated': 0,
    'runtime::Frame::module': 0,
    'runtime::Frame::type': 0,
    'runtime::Frame::function': 0,
    'runtime::Frame::src': 0,
    'runtime::Frame::line': 0,
    'runtime::Frame::column': 0,
    'runtime::Frame::scope': 0,
    'runtime::Job::function': 0,
    'runtime::Job::arguments': 0,
    'runtime::SecurityFields::email': 0,
    'runtime::SecurityFields::name': 0,
    'runtime::SecurityFields::first_name': 0,
    'runtime::SecurityFields::last_name': 0,
    'runtime::SecurityFields::roles': 0,
    'runtime::SecurityFields::groups': 0,
    'runtime::Task$is_running$args::task_id': 0,
    'runtime::Task$cancel$args::task_id': 0,
    'runtime::Debug$get$args::id': 0,
    'runtime::User$login$args::credentials': 0,
    'runtime::User$login$args::use_cookie': 0,
    'runtime::Permission::name': 0,
    'runtime::Permission::description': 0,
    'runtime::User::id': 0,
    'runtime::User::name': 0,
    'runtime::User::activated': 0,
    'runtime::User::full_name': 0,
    'runtime::User::email': 0,
    'runtime::User::role': 0,
    'runtime::User::groups': 0,
    'runtime::User::groups_flags': 0,
    'runtime::User::external': 0,
    'runtime::User$setPassword$args::name': 0,
    'runtime::User$setPassword$args::pass': 0,
    'runtime::LogDataUsage::read_bytes': 0,
    'runtime::LogDataUsage::read_hits': 0,
    'runtime::LogDataUsage::read_wasted': 0,
    'runtime::LogDataUsage::write_bytes': 0,
    'runtime::LogDataUsage::write_hits': 0,
    'runtime::LogDataUsage::cache_bytes': 0,
    'runtime::LogDataUsage::cache_hits': 0,
    'runtime::SecurityPolicy::entities': 0,
    'runtime::SecurityPolicy::credentials': 0,
    'runtime::SecurityPolicy::fields': 0,
    'runtime::SecurityPolicy::keys': 0,
    'runtime::SecurityPolicy::keys_last_refresh': 0,
    'runtime::Debug::id': 0,
    'runtime::Debug::frames': 0,
    'runtime::Debug::root': 0,
    'runtime::Debug$resume$args::id': 0,
    'runtime::Task::user_id': 0,
    'runtime::Task::task_id': 0,
    'runtime::Task::mod': 0,
    'runtime::Task::type': 0,
    'runtime::Task::fun': 0,
    'runtime::Task::creation': 0,
    'runtime::Task::start': 0,
    'runtime::Task::duration': 0,
    'runtime::Task::status': 0,
    'runtime::Task::progress': 0,
    'runtime::UserGroupPolicy::group_id': 0,
    'runtime::UserGroupPolicy::type': 0,
    'runtime::License::name': 0,
    'runtime::License::start': 0,
    'runtime::License::end': 0,
    'runtime::License::company': 0,
    'runtime::License::max_memory': 0,
    'runtime::License::extra_1': 0,
    'runtime::License::extra_2': 0,
    'runtime::License::type': 0,
    'runtime::Role::name': 0,
    'runtime::Role::permissions': 0,
    'io::GcbWriter::path': 0,
    'io::GcbWriter::append': 0,
    'io::CsvWriter::path': 0,
    'io::CsvWriter::append': 0,
    'io::CsvWriter::format': 0,
    'io::CsvStatistics::header_lines': 0,
    'io::CsvStatistics::separator': 0,
    'io::CsvStatistics::string_delimiter': 0,
    'io::CsvStatistics::decimal_separator': 0,
    'io::CsvStatistics::thousands_separator': 0,
    'io::CsvStatistics::columns': 0,
    'io::CsvStatistics::line_count': 0,
    'io::CsvStatistics::fail_count': 0,
    'io::CsvStatistics::file_count': 0,
    'io::CsvSharding::id': 0,
    'io::CsvSharding::column': 0,
    'io::CsvSharding::modulo': 0,
    'io::CsvReader::path': 0,
    'io::CsvReader::pos': 0,
    'io::CsvReader::format': 0,
    'io::CsvReader::sharding': 0,
    'io::TextWriter::path': 0,
    'io::TextWriter::append': 0,
    'io::TextReader::path': 0,
    'io::TextReader::pos': 0,
    'io::Csv$analyze$args::files': 0,
    'io::Csv$analyze$args::config': 0,
    'io::File::path': 0,
    'io::File::size': 0,
    'io::File::last_modification': 0,
    'io::Csv$generate$args::stats': 0,
    'io::FileWalker::path': 0,
    'io::HttpHeader::name': 0,
    'io::HttpHeader::value': 0,
    'io::Csv$sample$args::reader': 0,
    'io::Csv$sample$args::max_lines': 0,
    'io::CsvAnalysisConfig::header_lines': 0,
    'io::CsvAnalysisConfig::separator': 0,
    'io::CsvAnalysisConfig::string_delimiter': 0,
    'io::CsvAnalysisConfig::decimal_separator': 0,
    'io::CsvAnalysisConfig::thousands_separator': 0,
    'io::CsvAnalysisConfig::row_limit': 0,
    'io::CsvAnalysisConfig::enumerable_limit': 0,
    'io::CsvAnalysisConfig::date_check_limit': 0,
    'io::CsvAnalysisConfig::date_formats': 0,
    'io::GcbReader::path': 0,
    'io::GcbReader::pos': 0,
    'io::Url::protocol': 0,
    'io::Url::host': 0,
    'io::Url::port': 0,
    'io::Url::path': 0,
    'io::Url::params': 0,
    'io::Url::hash': 0,
    'io::CsvFormat::header_lines': 0,
    'io::CsvFormat::separator': 0,
    'io::CsvFormat::string_delimiter': 0,
    'io::CsvFormat::decimal_separator': 0,
    'io::CsvFormat::thousands_separator': 0,
    'io::CsvFormat::trim': 0,
    'io::CsvFormat::format': 0,
    'io::CsvFormat::tz': 0,
    'io::CsvFormat::strict': 0,
    'io::CsvFormat::nearest_time': 0,
    'io::XmlReader::path': 0,
    'io::XmlReader::pos': 0,
    'io::CsvColumnStatistics::name': 0,
    'io::CsvColumnStatistics::example': 0,
    'io::CsvColumnStatistics::null_count': 0,
    'io::CsvColumnStatistics::bool_count': 0,
    'io::CsvColumnStatistics::int_count': 0,
    'io::CsvColumnStatistics::float_count': 0,
    'io::CsvColumnStatistics::string_count': 0,
    'io::CsvColumnStatistics::date_count': 0,
    'io::CsvColumnStatistics::date_format_count': 0,
    'io::CsvColumnStatistics::enumerable_count': 0,
    'io::CsvColumnStatistics::profile': 0,
    'io::JsonReader::path': 0,
    'io::JsonReader::pos': 0,
    'io::JsonWriter::path': 0,
    'io::JsonWriter::append': 0,
    'io::Smtp::host': 0,
    'io::Smtp::port': 0,
    'io::Smtp::mode': 0,
    'io::Smtp::authenticate': 0,
    'io::Smtp::user': 0,
    'io::Smtp::pass': 0,
    'io::Email::from': 0,
    'io::Email::subject': 0,
    'io::Email::body': 0,
    'io::Email::body_is_html': 0,
    'io::Email::to': 0,
    'io::Email::cc': 0,
    'io::Email::bcc': 0,
    'util::SlidingWindow::values': 0,
    'util::SlidingWindow::span': 0,
    'util::SlidingWindow::sum': 0,
    'util::SlidingWindow::sumsq': 0,
    'util::SlidingWindow::field': 0,
    'util::Random::seed': 0,
    'util::Random::v': 0,
    'util::Histogram::quantizer': 0,
    'util::Histogram::bins': 0,
    'util::Histogram::nb_rejected': 0,
    'util::Histogram::nb_accepted': 0,
    'util::Histogram::min': 0,
    'util::Histogram::max': 0,
    'util::Histogram::sum': 0,
    'util::Histogram::sumsq': 0,
    'util::Gaussian::sum': 0,
    'util::Gaussian::sumsq': 0,
    'util::Gaussian::count': 0,
    'util::Gaussian::min': 0,
    'util::Gaussian::max': 0,
    'util::TimeWindow::values': 0,
    'util::TimeWindow::span': 0,
    'util::TimeWindow::sum': 0,
    'util::TimeWindow::sumsq': 0,
    'util::TimeWindow::field': 0,
    'util::MultiQuantizer::quantizers': 0,
    'util::Queue::values': 0,
    'util::Queue::capacity': 0,
    'util::LogQuantizer::min': 0,
    'util::LogQuantizer::max': 0,
    'util::LogQuantizer::bins': 0,
    'util::LogQuantizer::open': 0,
    'util::GaussianProfileSlot::sum': 0,
    'util::GaussianProfileSlot::sumsq': 0,
    'util::GaussianProfileSlot::count': 0,
    'util::HistogramBin::bin': 0,
    'util::HistogramBin::count': 0,
    'util::HistogramBin::ratio': 0,
    'util::HistogramBin::cumulative_count': 0,
    'util::HistogramBin::cumulative_ratio': 0,
    'util::GaussianProfile::quantizer': 0,
    'util::GaussianProfile::precision': 0,
    'util::GaussianProfile::bins': 0,
    'util::GaussianProfile::value_min': 0,
    'util::GaussianProfile::nb_rejected': 0,
    'util::LinearQuantizer::min': 0,
    'util::LinearQuantizer::max': 0,
    'util::LinearQuantizer::bins': 0,
    'util::LinearQuantizer::open': 0,
    'util::CustomQuantizer::min': 0,
    'util::CustomQuantizer::max': 0,
    'util::CustomQuantizer::step_starts': 0,
    'util::CustomQuantizer::open': 0,
    'util::HistogramStats::min': 0,
    'util::HistogramStats::max': 0,
    'util::HistogramStats::whisker_low': 0,
    'util::HistogramStats::whisker_high': 0,
    'util::HistogramStats::percentile1': 0,
    'util::HistogramStats::percentile5': 0,
    'util::HistogramStats::percentile10': 0,
    'util::HistogramStats::percentile20': 0,
    'util::HistogramStats::percentile25': 0,
    'util::HistogramStats::percentile50': 0,
    'util::HistogramStats::percentile75': 0,
    'util::HistogramStats::percentile80': 0,
    'util::HistogramStats::percentile90': 0,
    'util::HistogramStats::percentile95': 0,
    'util::HistogramStats::percentile99': 0,
    'util::HistogramStats::sum': 0,
    'util::HistogramStats::avg': 0,
    'util::HistogramStats::std': 0,
    'util::HistogramStats::size': 0,
    'util::ProgressTracker::start': 0,
    'util::ProgressTracker::total': 0,
    'util::ProgressTracker::counter': 0,
    'util::ProgressTracker::duration': 0,
    'util::ProgressTracker::progress': 0,
    'util::ProgressTracker::speed': 0,
    'util::ProgressTracker::remaining': 0,
    'util::QuantizerSlotBound::min': 0,
    'util::QuantizerSlotBound::max': 0,
    'util::QuantizerSlotBound::center': 0,
    'util::Stack::values': 0,
    'model::UE::id': 0,
    'model::UE::rnti': 0,
    'model::UE::pdus': 0,
    'model::UE::du': 0,
    'model::UE::position': 0,
    'model::UE::synchronizationSignal': 0,
    'model::PDUSession::id': 0,
    'model::PDUSession::status': 0,
    'model::BWP::subCarrierSpacing': 0,
    'model::BWP::numberOfRBs': 0,
    'model::SynchronizationSignal::rsrp': 0,
    'model::SynchronizationSignal::rsrq': 0,
    'model::SynchronizationSignal::sinr': 0,
    'model::TDD::band': 0,
    'model::TDD::arfcn': 0,
    'model::NrCellCU::nRCellId': 0,
    'model::NrCellCU::physicalCellId': 0,
    'model::NrCellCU::nrCellDU_by_duId': 0,
    'model::NrCellCU::nrCellDU_by_index': 0,
    'model::NrCellDU::nRCellId': 0,
    'model::NrCellDU::physicalCellId': 0,
    'model::NrCellDU::nrCellCU': 0,
    'model::NrCellDU::ssb': 0,
    'model::NrCellDU::policy': 0,
    'model::NrCellDU::tdd': 0,
    'model::NrCellDU::bwp': 0,
    'model::NrCellDU::userEquipments': 0,
    'model::SSB::arfcn': 0,
    'api::graphSnapshot$args::t': 0,
    'api::NetworkSnapshot::nodes': 0,
    'api::NetworkSnapshot::edges': 0,
    'api::ueSignal$args::ueId': 0,
    'api::ueSignal$args::t': 0,
    'api::NetworkEdgeItem::id': 0,
    'api::NetworkEdgeItem::from': 0,
    'api::NetworkEdgeItem::to': 0,
    'api::NetworkNodeItem::id': 0,
    'api::NetworkNodeItem::type': 0,
    'api::NetworkNodeItem::label': 0,
  }

  interface $FunctionsMap {
    'core::Table::applyMappings': 0,
    'core::nodeIndex::info': 0,
    'core::nodeIndex::sample': 0,
    'core::nodeList::info': 0,
    'core::nodeList::sample': 0,
    'core::nodeTime::info': 0,
    'core::nodeTime::sample': 0,
    'core::nodeGeo::info': 0,
    'core::nodeGeo::sample': 0,
    'core::node::resolve_all': 0,
    'core::Date::from_time': 0,
    'runtime::PeriodicTask::set': 0,
    'runtime::PeriodicTask::all': 0,
    'runtime::OpenIDConnect::config': 0,
    'runtime::SecurityFields::get': 0,
    'runtime::SecurityFields::set': 0,
    'runtime::Permission::all': 0,
    'runtime::User::setPassword': 0,
    'runtime::User::permissions': 0,
    'runtime::User::me': 0,
    'runtime::User::current': 0,
    'runtime::User::renew': 0,
    'runtime::User::logout': 0,
    'runtime::User::tokenLogin': 0,
    'runtime::User::login': 0,
    'runtime::Debug::resume': 0,
    'runtime::Debug::get': 0,
    'runtime::Debug::all': 0,
    'runtime::Task::is_running': 0,
    'runtime::Task::cancel': 0,
    'runtime::Task::history': 0,
    'runtime::Task::running': 0,
    'runtime::Role::all': 0,
    'runtime::Runtime::root': 0,
    'runtime::Runtime::abi': 0,
    'runtime::Runtime::info': 0,
    'runtime::SecurityEntity::set': 0,
    'runtime::SecurityEntity::all': 0,
    'io::Csv::sample': 0,
    'io::Csv::analyze': 0,
    'io::Csv::generate': 0,
    'api::graphSnapshot': 0,
    'api::ueSignal': 0,
  }

  export import ErrorCode = gc.core.ErrorCode;
  export import Table = gc.core.Table;
  export import nodeIndex = gc.core.nodeIndex;
  export import GeoCircle = gc.core.GeoCircle;
  export import TimeZone = gc.core.TimeZone;
  export import String = gc.core.String;
  export import GeoBox = gc.core.GeoBox;
  export import MathConstants = gc.core.MathConstants;
  export import field = gc.core.field;
  export import CalendarUnit = gc.core.CalendarUnit;
  export import Buffer = gc.core.Buffer;
  export import nodeList = gc.core.nodeList;
  export import nodeTime = gc.core.nodeTime;
  export import t3 = gc.core.t3;
  export import duration = gc.core.duration;
  export import Tensor = gc.core.Tensor;
  export import SortOrder = gc.core.SortOrder;
  export import NodeInfo = gc.core.NodeInfo;
  export import t4f = gc.core.t4f;
  export import null_ = gc.core.null_;
  export import type = gc.core.type;
  export import geo = gc.core.geo;
  export import SamplingMode = gc.core.SamplingMode;
  export import Error = gc.core.Error;
  export import Map = gc.core.Map;
  export import nodeTimeCursor = gc.core.nodeTimeCursor;
  export import nodeGeo = gc.core.nodeGeo;
  export import node = gc.core.node;
  export import DurationUnit = gc.core.DurationUnit;
  export import TableColumnMapping = gc.core.TableColumnMapping;
  export import TensorType = gc.core.TensorType;
  export import Tuple = gc.core.Tuple;
  export import time = gc.core.time;
  export import bool = gc.core.bool;
  export import t2 = gc.core.t2;
  export import ErrorFrame = gc.core.ErrorFrame;
  export import t4 = gc.core.t4;
  export import Array = gc.core.Array;
  export import GeoPoly = gc.core.GeoPoly;
  export import FloatPrecision = gc.core.FloatPrecision;
  export import char = gc.core.char;
  export import float = gc.core.float;
  export import int = gc.core.int;
  export import t3f = gc.core.t3f;
  export import str = gc.core.str;
  export import Date = gc.core.Date;
  export import function_ = gc.core.function_;
  export import t2f = gc.core.t2f;
  export import RuntimeInfo = gc.runtime.RuntimeInfo;
  export import PeriodicTask = gc.runtime.PeriodicTask;
  export import Log = gc.runtime.Log;
  export import OpenIDConnect = gc.runtime.OpenIDConnect;
  export import MergeStrategy = gc.runtime.MergeStrategy;
  export import UserGroup = gc.runtime.UserGroup;
  export import Job = gc.runtime.Job;
  export import UserGroupPolicyType = gc.runtime.UserGroupPolicyType;
  export import SecurityFields = gc.runtime.SecurityFields;
  export import LogLevel = gc.runtime.LogLevel;
  export import TaskStatus = gc.runtime.TaskStatus;
  export import User = gc.runtime.User;
  export import LogDataUsage = gc.runtime.LogDataUsage;
  export import SecurityPolicy = gc.runtime.SecurityPolicy;
  export import Task = gc.runtime.Task;
  export import LicenseType = gc.runtime.LicenseType;
  export import UserGroupPolicy = gc.runtime.UserGroupPolicy;
  export import License = gc.runtime.License;
  export import System = gc.runtime.System;
  export import Runtime = gc.runtime.Runtime;
  export import SecurityEntity = gc.runtime.SecurityEntity;
  export import Json = gc.io.Json;
  export import GcbWriter = gc.io.GcbWriter;
  export import CsvWriter = gc.io.CsvWriter;
  export import CsvStatistics = gc.io.CsvStatistics;
  export import CsvSharding = gc.io.CsvSharding;
  export import CsvReader = gc.io.CsvReader;
  export import TextWriter = gc.io.TextWriter;
  export import TextReader = gc.io.TextReader;
  export import Http = gc.io.Http;
  export import File = gc.io.File;
  export import SmtpMode = gc.io.SmtpMode;
  export import SmtpAuth = gc.io.SmtpAuth;
  export import Writer = gc.io.Writer;
  export import FileWalker = gc.io.FileWalker;
  export import HttpHeader = gc.io.HttpHeader;
  export import CsvAnalysisConfig = gc.io.CsvAnalysisConfig;
  export import GcbReader = gc.io.GcbReader;
  export import Url = gc.io.Url;
  export import CsvFormat = gc.io.CsvFormat;
  export import Reader = gc.io.Reader;
  export import XmlReader = gc.io.XmlReader;
  export import CsvColumnStatistics = gc.io.CsvColumnStatistics;
  export import JsonReader = gc.io.JsonReader;
  export import Csv = gc.io.Csv;
  export import JsonWriter = gc.io.JsonWriter;
  export import Smtp = gc.io.Smtp;
  export import Email = gc.io.Email;
  export import SlidingWindow = gc.util.SlidingWindow;
  export import Random = gc.util.Random;
  export import Crypto = gc.util.Crypto;
  export import Histogram = gc.util.Histogram;
  export import Gaussian = gc.util.Gaussian;
  export import TimeWindow = gc.util.TimeWindow;
  export import MultiQuantizer = gc.util.MultiQuantizer;
  export import Queue = gc.util.Queue;
  export import LogQuantizer = gc.util.LogQuantizer;
  export import GaussianProfileSlot = gc.util.GaussianProfileSlot;
  export import Plot = gc.util.Plot;
  export import HistogramBin = gc.util.HistogramBin;
  export import Quantizer = gc.util.Quantizer;
  export import GaussianProfile = gc.util.GaussianProfile;
  export import LinearQuantizer = gc.util.LinearQuantizer;
  export import Assert = gc.util.Assert;
  export import CustomQuantizer = gc.util.CustomQuantizer;
  export import HistogramStats = gc.util.HistogramStats;
  export import ProgressTracker = gc.util.ProgressTracker;
  export import QuantizerSlotBound = gc.util.QuantizerSlotBound;
  export import Stack = gc.util.Stack;
  export import UE = gc.model.UE;
  export import CommunicationTypeUtils = gc.model.CommunicationTypeUtils;
  export import PDUSession = gc.model.PDUSession;
  export import BWP = gc.model.BWP;
  export import SynchronizationSignal = gc.model.SynchronizationSignal;
  export import TDD = gc.model.TDD;
  export import NrCellCU = gc.model.NrCellCU;
  export import PDUSessionStatus = gc.model.PDUSessionStatus;
  export import CommunicationType = gc.model.CommunicationType;
  export import NrCellDU = gc.model.NrCellDU;
  export import SSB = gc.model.SSB;
  export import NetworkSnapshot = gc.api.NetworkSnapshot;
  export import NetworkEdgeItem = gc.api.NetworkEdgeItem;
  export import NetworkNodeItem = gc.api.NetworkNodeItem;
  export import graphSnapshot = gc.api.graphSnapshot;
  export import ueSignal = gc.api.ueSignal;
}
