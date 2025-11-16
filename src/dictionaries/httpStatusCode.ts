export const httpStatusCode = {
    //indicates that the initial part of a request has been received and has not yet been rejected by the server.
    "CONTINUE": 100,

    //indicates that the server understands and is willing to comply with the client's request, via the Upgrade header field, for a change in the application protocol being used on this connection.
    "SWITCHING_PROTOCOLS": 101,

    //indicates that the request has succeeded.
    "OK": 200,

    //indicates that the request has been fulfilled and has resulted in one or more new resources being created.\
    "CREATED": 201,

    //indicates that the request has been accepted for processing, but the processing has not been completed.
    "ACCEPTED": 202,

    //indicates that the request was successful, but the enclosed payload has been modified from that of the origin server's 200 (OK) response by a transforming proxy.
    "NON_AUTHORITATIVE_INFORMATION": 203,

    //indicates that the server has successfully fulfilled the request and that there is no additional content to send in the response payload body.
    "NO_CONTENT": 204,

    //indicates that the server has fulfilled the request and desires that the user agent reset the "document view", which caused the request to be sent, to its original state as received from the origin server.
    "RESET_CONTENT": 205,

    //indicates that the server is successfully fulfilling a range request for the target resource by transferring one or more parts of the selected representation that correspond to the satisfiable ranges found in the request's Range header field.
    "PARTIAL_CONTENT": 206,

    //indicates that the target resource has more than one representation, each with its own more specific identifier, and information about the alternatives is being provided so that the user (or user agent) can select a preferred representation by redirecting its request to one or more of those identifiers.
    "MULTIPLE_CHOICES": 300,

    //indicates that the target resource has been assigned a new permanent URI and any future references to this resource ought to use one of the enclosed URIs.
    "MOVED_PERMANENTLY": 301,

    //indicates that the target resource resides temporarily under a different URI.
    "FOUND": 302,

    //indicates that the server is redirecting the user agent to a different resource, as indicated by a URI in the Location header field, that is intended to provide an indirect response to the original request.
    "SEE_OTHER": 303,

    //indicates that a conditional GET request has been received and would have resulted in a 200 (OK) response if it were not for the fact that the condition has evaluated to false.
    "NOT_MODIFIED": 304,

    //indicates that the target resource resides temporarily under a different URI, and the user agent MUST NOT change the request method if it performs an automatic redirection to that URI.
    "TEMPORARY_REDIRECT": 307,

    //indicates that the server cannot or will not process the request because the received syntax is invalid, nonsensical, or exceeds some limitation on what the server is willing to process.
    "BAD_REQUEST": 400,

    //indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.
    "UNAUTHORIZED": 401,

    //*reserved*
    "PAYMENT_REQUIRED": 402,

    //indicates that the server understood the request but refuses to authorize it.
    "FORBIDDEN": 403,

    //indicates that the origin server did not find a current representation for the target resource or is not willing to disclose that one exists.
    "NOT_FOUND": 404,

    //indicates that the method specified in the request-line is known by the origin server but not supported by the target resource.
    "METHOD_NOT ALLOWED": 405,

    //Indicates that the target resource does not have a current representation that would be acceptable to the user agent, according to the proactive negotiation header fields received in the request. The server is unwilling to supply a default representation.
    "NOT_ACCEPTABLE": 406,

    //is similar to 401 (Unauthorized), but indicates that the client needs to authenticate itself to use a proxy.
    "PROXY_AUTHENTICATION_REQUIRED": 407,

    //indicates that the server did not receive a complete request message within the time that it was prepared to wait.
    "REQUEST_TIMEOUT": 408,

    //indicates that the request could not be completed due to a conflict with the current state of the resource.
    "CONFLICT": 409,

    //indicates that access to the target resource is no longer available at the origin server and that this condition is likely to be permanent.
    "GONE": 410,

    //indicates that the server refuses to accept the request without a defined Content-Length.
    "LENGTH_REQUIRED": 411,

    //indicates that one or more preconditions given in the request header fields evaluated to false when tested on the server.
    "PRECONDITION_FAILED": 412,

    //indicates that the server is refusing to process a request because the request payload is larger than the server is willing or able to process.
    "PAYLOAD_TOO_LARGE": 413,

    //indicates that the server is refusing to service the request because the request-target is longer than the server is willing to interpret.
    "URI_TOO_LONG": 414,

    //indicates that the origin server is refusing to service the request because the payload is in a format not supported by the target resource for this method.
    "UNSUPPORTED_MEDIA_TYPE": 415,

    //indicates that none of the ranges in the request's Range header field overlap the current extent of the selected resource or that the set of ranges requested has been rejected due to invalid ranges or an excessive request of small or overlapping ranges.
    "RANGE_NOT_SATISFIABLE": 416,

    //indicates that the expectation given in the request's Expect header field could not be met by at least one of the inbound servers.
    "EXPECTATION_FAILED": 417,

    //indicates that the server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.
    "UPGRADE_REQUIRED": 426,

    //indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
    "INTERNAL_SERVER_ERROR": 500,

    //indicates that the server does not support the functionality required to fulfill the request.
    "NOT_IMPLEMENTED": 501,

    //indicates that the server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request.
    "BAD_GATEWAY": 502,

    //indicates that the server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay.
    "SERVICE_UNAVAILABLE": 503,

    //indicates that the server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access to complete the request.
    "GATEWAY_TIME_OUT": 504,

    //indicates that the server does not support, or refuses to support, the protocol version that was used in the request message.
    "HTTP_VERSION_NOT_SUPPORTED": 505,

    //is an interim response used to inform the client that the server has accepted the complete request but has not yet completed it.
    "PROCESSING": 102,

    //provides status for multiple independent operations.
    "MULTI_STATUS": 207,

    //The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.
    "IM_USED": 226,

    //indicates that the requested resource has been permanently moved to the URL given by the Location header.
    "PERMANENT_REDIRECT": 308,

    //indicates that the server understood the content type of the request content, and the syntax of the request content was correct, but it was unable to process the contained instructions.
    "UNPROCESSABLE_ENTITY": 422,

    //means the source or destination resource of a method is locked.
    "LOCKED": 423,

    //means that the method could not be performed on the resource because the requested action depended on another action and that action failed.
    "FAILED_DEPENDENCY": 424,

    //indicates that the origin server requires the request to be conditional.
    "PRECONDITION_REQUIRED": 428,

    //indicates that the user has sent too many requests in a given amount of time (rate limiting).
    "TOO_MANY_REQUESTS": 429,

    //indicates that the server is unwilling to process the request because its header fields are too large.
    "REQUEST_HEADER_FIELDS_TOO_LARGE": 431,

    //This status code indicates that the server is denying access to the resource in response to a legal demand.
    "UNAVAILABLE_FOR_LEGAL_REASONS": 451,

    //indicates that the server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.
    "VARIANT_ALSO_NEGOTIATES": 506,

    //means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.
    "INSUFFICIENT_STORAGE": 507,

    //indicates that the client needs to authenticate to gain network access.
    "NETWORK_AUTHENTICATION_REQUIRED": 511
} as const