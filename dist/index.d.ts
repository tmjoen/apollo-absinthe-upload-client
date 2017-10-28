import { HTTPFetchNetworkInterface } from "apollo-client";
import { NetworkInterfaceOptions, RequestAndOptions } from "apollo-client/transport/networkInterface";
export declare class HTTPFetchUploadNetworkInterface extends HTTPFetchNetworkInterface {
    fetchFromRemoteEndpoint({request, options}: RequestAndOptions): Promise<Response>;
}
export declare function createNetworkInterface(options: NetworkInterfaceOptions): HTTPFetchUploadNetworkInterface;
